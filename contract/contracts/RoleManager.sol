// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleManager is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant RECYCLER_ROLE = keccak256("RECYCLER_ROLE");
    bytes32 public constant RAGPICKER_ROLE = keccak256("RAGPICKER_ROLE");
    bytes32 public constant CITIZEN_ROLE = keccak256("CITIZEN_ROLE");

    mapping(address => bool) public hasAnyRole;

    event RoleRequested(address indexed account, bytes32 indexed role);
    event RoleRegistered(address indexed account, bytes32 indexed role);

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        hasAnyRole[msg.sender] = true;
    }

    function registerRole(bytes32 role) external {
        require(role != ADMIN_ROLE, "Cannot self-register as admin");
        require(!hasAnyRole[msg.sender], "Address already has a role");
        require(
            role == MANUFACTURER_ROLE ||
                role == RECYCLER_ROLE ||
                role == RAGPICKER_ROLE ||
                role == CITIZEN_ROLE,
            "Invalid role"
        );

        _grantRole(role, msg.sender);
        hasAnyRole[msg.sender] = true;
        emit RoleRegistered(msg.sender, role);
    }

    function requestRole(bytes32 role) external {
        require(!hasAnyRole[msg.sender], "Address already has a role");
        emit RoleRequested(msg.sender, role);
    }

    function assignRole(
        address account,
        bytes32 role
    ) external onlyRole(ADMIN_ROLE) {
        require(!hasAnyRole[account], "Address already has a role");
        _grantRole(role, account);
        hasAnyRole[account] = true;
        emit RoleRegistered(account, role);
    }
}
