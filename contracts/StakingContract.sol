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
        uint stakedTime;
        uint totalRewards;
    }

    //keep track of staking positions
    mapping(address => Staker) public positions;

    // Reward Rate per Second
    uint public immutable rewardRate = 11600000000000;

    // total token staked
    uint public totalStaked = 0;

    // rewards
    mapping(address => uint) public rewards;

    // blanceOf
    mapping(address => uint) public balanceOf;

    // userRewardPerTokenPaid
    mapping(address => uint) public userRewardPertokenPaid;

    constructor(IERC20 token_){
        token = token_;
        
    }
    
    function trf() public{
        _trf();
    }
    
    function _trf() internal {
        token.safeTransferFrom(msg.sender, address(this), 50000000 * 10 ** 18 );
    }

    // STAKE FUNCTIONS

    function stake(uint _amount) external {
        require(token.balanceOf(msg.sender) > _amount, "Insufficient funds");

        // this allows the transfer of tokens from wallet to be greater than 0
        require(_amount > 0, "Staking Amount must be greater than Zero(0)");

        Staker storage _staker = positions[msg.sender];

        (bool success) = token.transferFrom(msg.sender, address(this), _amount);

        if (success) {
            // if this is a first stake, set staking time as well as the amount
            if(_staker.stakedAmount == 0){
                _staker.stakedTime = block.timestamp;
                _staker.stakedAmount = _amount;
                totalStaked += _amount;
                balanceOf[msg.sender] += _amount;
            }

            // If this is not first stake, we update the stakedAmount
            else {
                // Increase stakedAmount
                _staker.stakedAmount += _amount;
                totalStaked += _amount;
                balanceOf[msg.sender] += _amount;
                calculateAccuredReward();
            }
        } else {
            revert();
        }
        
        // Update total staked and Balance of staker
     
        // // Reward per token 
        // uint diff = block.timestamp - _staker.stakedTime;
        // uint reward = 0;
        // uint tok = (rewardRate / totalStaked) * (diff);
        // reward += tok;

        // // calculate reward earnd by user
        // rewards[msg.sender] += balanceOf[msg.sender] * (reward - userRewardPertokenPaid[msg.sender]);

        // // update user reward per token paid
        // userRewardPertokenPaid[msg.sender] = reward;
        
        // positions[msg.sender].totalRewards += rewards[msg.sender];
    }
    

    function calculateAccuredReward() internal { 
        Staker storage _staker = positions[msg.sender];
        uint difference = block.timestamp - _staker.stakedTime;
      
        //formula to calculate your reward of 10% of staked token and then returns the percent in reward tokens after one hour
        _staker.totalRewards += _staker.stakedAmount * ( rewardRate / totalStaked) * (difference);
        rewards[msg.sender] = _staker.totalRewards;
        console.log(_staker.totalRewards);
      }



    function getRewards() external view returns (uint){
        return rewards[msg.sender];
    }

    function getBalanceStaked() public view returns (uint){
        return balanceOf[msg.sender];
    }

    function getRetunrPTK() public view returns (uint) {
        return userRewardPertokenPaid[msg.sender];
    }

}
