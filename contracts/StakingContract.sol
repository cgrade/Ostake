// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

/* 
    This file contain a staking contract for the Ostake (Defi Staking Protocol)
    it defines the staking logic and every available functions and events.
*/
// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract StakingContract {

    // Using safeERC20 and making token value immutable
    using SafeERC20 for IERC20;
    IERC20 public immutable token;

    // Defining Variables
    struct Staker {
        uint stakedAmount;
        uint lastUpdateTime;
        uint totalRewards;
    }

    //keep track of staking positions
    mapping(address => Staker) public positions;

    // Reward Rate per Second
    uint public immutable rewardRate = 11600000000000;

    // total token staked
    uint public totalStaked = 0;


    constructor(IERC20 token_){
        token = token_;
        
    }
    
    function trf() public{
        _trf();
    }
    
    function _trf() internal {
        token.safeTransferFrom(msg.sender, address(this), 500000000);
    }


}
