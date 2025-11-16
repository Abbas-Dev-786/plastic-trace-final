// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RoleManager.sol";
import "./RecyclingTracker.sol";
import "./RewardToken.sol";

contract RewardDistributor is AccessControl {
    RoleManager public immutable roleManager;
    RecyclingTracker public immutable recyclingTracker;
    RewardToken public immutable rewardToken;

    uint256 public rewardPerScan = 10 ether;
    uint256 public rewardPerVerification = 5 ether;

    event RewardsDistributed(
        uint256 qrId,
        address ragPicker,
        uint256 scanReward,
        address recycler,
        uint256 verifyReward
    );

    constructor(
        address _roleManager,
        address _recyclingTracker,
        address _rewardToken
    ) {
        roleManager = RoleManager(_roleManager);
        recyclingTracker = RecyclingTracker(_recyclingTracker);
        rewardToken = RewardToken(_rewardToken);
        _grantRole(roleManager.ADMIN_ROLE(), msg.sender);
    }

    function distributeRewards(uint256 qrId) external {
        require(
            roleManager.hasRole(roleManager.RECYCLER_ROLE(), msg.sender),
            "Not a recycler"
        );
        (
            ,
            address ragPicker,
            ,
            RecyclingTracker.Status status,

        ) = recyclingTracker.trackRecords(qrId);
        require(
            status == RecyclingTracker.Status.Verified,
            "QR not in Verified state"
        );
        require(ragPicker != address(0), "No rag picker for QR");

        rewardToken.mint(ragPicker, rewardPerScan);
        rewardToken.mint(msg.sender, rewardPerVerification);

        emit RewardsDistributed(
            qrId,
            ragPicker,
            rewardPerScan,
            msg.sender,
            rewardPerVerification
        );
    }

    function setRewardAmounts(
        uint256 scanAmount,
        uint256 verifyAmount
    ) external {
        require(
            roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not admin"
        );
        rewardPerScan = scanAmount;
        rewardPerVerification = verifyAmount;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
