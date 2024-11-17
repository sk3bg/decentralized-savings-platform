// contracts/Token.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract SavingsGoals is ERC20, Ownable{
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

     // Mint function, restricted to the owner (contract deployer)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    struct Goal {
        uint id;
        address user;
        uint targetAmount;
        uint deadline;
        uint balance;
    }

    mapping(uint => Goal) public userGoals;
    uint public goalCounter = 1;

    event GoalCreated(uint indexed goalId,address user, uint targetAmount, uint deadline);
    event ContributionMade(uint indexed goalId, address user, uint amount);
    event GoalAchieved(uint indexed goalId, address user);

    // Create a new savings goal
    function createSavingsGoal(uint _targetAmount, uint _deadline) external {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint goalId =  goalCounter++;

        Goal memory newGoal = Goal({
            id: goalId,
            user: msg.sender,
            targetAmount: _targetAmount,
            deadline: _deadline,
            balance: 0
        });
        
        userGoals[goalId]=newGoal;
        console.log("Goal Object created and ready to emit: goadId=", goalId);
        emit GoalCreated(goalId, msg.sender, _targetAmount, _deadline);
    }

    // Contribute to an existing savings goal
    function contribute(uint _goalId) external payable {
        console.log("Contribution method called with goalId=", _goalId);
        Goal storage goal = userGoals[_goalId];
        require(_goalId > 0, "Invalid goal ID");
        require(block.timestamp <= goal.deadline, "Goal deadline has passed");
        require(msg.value > 0, "Contribution must be greater than 0");

        goal.balance += msg.value;
        console.log("Contribution made and ready to emit. contribution balance=", goal.balance);
        emit ContributionMade(_goalId, msg.sender, msg.value);

        if (goal.balance >= goal.targetAmount) {
            emit GoalAchieved(_goalId, msg.sender);
        }
    }

    // Get progress of a specific savings goal
    function getProgress(uint _goalId) external view returns (uint, uint, uint, uint) {
        console.log("getProgress method called with goalId=", _goalId);
        Goal storage goal = userGoals[_goalId];
        require(_goalId > 0, "Invalid goal ID");
        
        return (goal.targetAmount, goal.balance, goal.deadline, goal.id);
    }
}
