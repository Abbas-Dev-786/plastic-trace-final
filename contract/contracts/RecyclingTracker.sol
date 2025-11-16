// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";
import "./EcoNFT.sol";

contract RecyclingTracker is AccessControl {
    RoleManager public immutable roleManager;
    EcoNFT public immutable ecoNFT;

    enum Status {
        Assigned,
        Scanned,
        Verified,
        Recycled
    }
    struct TrackRecord {
        uint256 qrId;
        address ragPicker;
        address recycler;
        Status status;
        uint256 timestamp;
    }

    mapping(uint256 => TrackRecord) public trackRecords;
    mapping(address => uint256) public userScans;
    uint256 public constant NFT_MILESTONE_LEVEL = 1;

    event QRScanned(uint256 qrId, address ragPicker);
    event QRVerified(uint256 qrId, address recycler);
    event QRRecycled(uint256 qrId, address recycler);

    constructor(address _roleManager, address _ecoNFT) {
        roleManager = RoleManager(_roleManager);
        ecoNFT = EcoNFT(_ecoNFT);
        _grantRole(roleManager.ADMIN_ROLE(), msg.sender);
    }

    function scanQR(uint256 qrId) external {
        require(
            roleManager.hasRole(roleManager.RAGPICKER_ROLE(), msg.sender),
            "Not a rag picker"
        );
        require(
            trackRecords[qrId].status == Status.Assigned,
            "QR not in Assigned state"
        );

        trackRecords[qrId] = TrackRecord(
            qrId,
            msg.sender,
            address(0),
            Status.Scanned,
            block.timestamp
        );
        userScans[msg.sender]++;

        if (
            userScans[msg.sender] >=
            ecoNFT.milestoneThresholds(NFT_MILESTONE_LEVEL)
        ) {
            ecoNFT.mintMilestoneNFT(msg.sender, NFT_MILESTONE_LEVEL);
        }

        emit QRScanned(qrId, msg.sender);
    }

    function verifyScan(uint256 qrId) external {
        require(
            roleManager.hasRole(roleManager.RECYCLER_ROLE(), msg.sender),
            "Not a recycler"
        );
        require(
            trackRecords[qrId].status == Status.Scanned,
            "QR not in Scanned state"
        );

        trackRecords[qrId].recycler = msg.sender;
        trackRecords[qrId].status = Status.Verified;
        trackRecords[qrId].timestamp = block.timestamp;
        emit QRVerified(qrId, msg.sender);
    }

    function markRecycled(uint256 qrId) external {
        require(
            roleManager.hasRole(roleManager.RECYCLER_ROLE(), msg.sender),
            "Not a recycler"
        );
        require(
            trackRecords[qrId].status == Status.Verified,
            "QR not in Verified state"
        );

        trackRecords[qrId].status = Status.Recycled;
        trackRecords[qrId].timestamp = block.timestamp;
        emit QRRecycled(qrId, msg.sender);
    }

    function getUserScans(address user) external view returns (uint256) {
        return userScans[user];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
