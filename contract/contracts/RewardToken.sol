// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./RoleManager.sol";

contract RewardToken is ERC20 {
    RoleManager public immutable roleManager;

    constructor(address _roleManager) ERC20("EcoRewardToken", "ERT") {
        roleManager = RoleManager(_roleManager);
    }

    function mint(address to, uint256 amount) external {
        require(
            roleManager.hasRole(roleManager.ADMIN_ROLE(), msg.sender),
            "Not admin"
        );
        _mint(to, amount);
    }
}
