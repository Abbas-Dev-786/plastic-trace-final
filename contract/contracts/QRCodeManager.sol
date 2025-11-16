// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";

contract QRCodeManager is AccessControl {
    RoleManager public immutable roleManager;

    uint256 public nextQrId;
    mapping(uint256 => address) public qrToManufacturer;
    mapping(uint256 => string) public qrMetadata;

    event QRCodesGenerated(uint256[] qrIds);
    event QRAssigned(uint256 qrId, address manufacturer);
    event QRMetadataSet(uint256 qrId, string ipfsHash);

    constructor(address _roleManager) {
        roleManager = RoleManager(_roleManager);
        _grantRole(roleManager.ADMIN_ROLE(), msg.sender);
        nextQrId = 1;
    }

    function generateQRCodes(uint256 amount) external {
        require(
            roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not admin"
        );
        require(
            amount > 0 && amount <= 1000,
            "Amount must be between 1 and 1000"
        );

        uint256 start = nextQrId;
        nextQrId += amount;
        uint256[] memory qrIds = new uint256[](amount);
        for (uint256 i = 0; i < amount; i++) {
            qrIds[i] = start + i;
        }
        emit QRCodesGenerated(qrIds);
    }

    function assignQRToManufacturer(
        uint256 qrId,
        address manufacturer
    ) external {
        require(
            roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not admin"
        );
        require(qrId < nextQrId, "Invalid QR ID");
        require(qrToManufacturer[qrId] == address(0), "QR already assigned");
        require(
            roleManager.hasRole(roleManager.MANUFACTURER_ROLE(), manufacturer),
            "Not a manufacturer"
        );

        qrToManufacturer[qrId] = manufacturer;
        emit QRAssigned(qrId, manufacturer);
    }

    function setQRMetadata(uint256 qrId, string calldata ipfsHash) external {
        require(
            roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not admin"
        );
        require(qrId < nextQrId, "Invalid QR ID");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        qrMetadata[qrId] = ipfsHash;
        emit QRMetadataSet(qrId, ipfsHash);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
