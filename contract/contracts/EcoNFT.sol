// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";
import "./RecyclingTracker.sol";

contract EcoNFT is ERC721URIStorage {
    RoleManager public immutable roleManager;
    RecyclingTracker public recyclingTracker;

    string public baseTokenURI = "ipfs://QmExampleHash/metadata/"; // admin can change
    uint256 public nextTokenId = 1;

    mapping(uint256 => uint256) public milestoneLevel;
    mapping(uint256 => uint256) public milestoneThresholds;

    event MilestoneNFTMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        uint256 milestoneLevel
    );
    event BaseURIChanged(string newBaseURI);

    modifier onlyAdmin() {
        require(
            roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not admin"
        );
        _;
    }

    modifier onlyRecyclingTrackerOrAdmin() {
        require(
            msg.sender == address(recyclingTracker) ||
                roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not authorized"
        );
        _;
    }

    constructor(
        address _roleManager,
        address _recyclingTracker
    ) ERC721("EcoNFT", "ENFT") {
        roleManager = RoleManager(_roleManager);
        recyclingTracker = RecyclingTracker(_recyclingTracker);

        milestoneThresholds[1] = 2;
        milestoneThresholds[2] = 5;
        milestoneThresholds[3] = 10;
    }

    /* -------------------------------------------------- */
    /*  Admin                                             */
    /* -------------------------------------------------- */
    function setRecyclingTracker(address _recyclingTracker) external onlyAdmin {
        recyclingTracker = RecyclingTracker(_recyclingTracker);
    }

    function setBaseURI(string calldata _newBaseURI) external onlyAdmin {
        baseTokenURI = _newBaseURI;
        emit BaseURIChanged(_newBaseURI);
    }

    function setMilestoneThreshold(
        uint256 level,
        uint256 scanCount
    ) external onlyAdmin {
        require(level > 0 && level <= 3, "Invalid level");
        require(scanCount > 0, "Invalid scan count");
        milestoneThresholds[level] = scanCount;
    }

    /* -------------------------------------------------- */
    /*  Minting                                           */
    /* -------------------------------------------------- */
    function mintMilestoneNFT(
        address to,
        uint256 _milestoneLevel
    ) external onlyRecyclingTrackerOrAdmin {
        require(
            _milestoneLevel >= 1 && _milestoneLevel <= 3,
            "Invalid milestone level"
        );
        require(
            recyclingTracker.getUserScans(to) >=
                milestoneThresholds[_milestoneLevel],
            "Insufficient scans"
        );

        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, _buildTokenURI(tokenId));
        milestoneLevel[tokenId] = _milestoneLevel;

        emit MilestoneNFTMinted(to, tokenId, _milestoneLevel);
    }

    /* -------------------------------------------------- */
    /*  Views / Helpers                                   */
    /* -------------------------------------------------- */
    function _buildTokenURI(
        uint256 tokenId
    ) internal view returns (string memory) {
        return
            string(abi.encodePacked(baseTokenURI, uint2str(tokenId), ".json"));
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        return string(bstr);
    }
}
