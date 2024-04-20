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
    struct  Staker {
        uint stakedAmount;
        uint stakedTime;
        uint totalRewards;
    }

    //keep track of staking positions
    mapping(address => Staker) public positions;

    // Reward Rate per Second in WEI
    uint public immutable rewardRate = 11600000000000;

    // total token staked
    uint public totalStaked = 0;

    // rewards: keep tracks of rewards for stakers
    mapping(address => uint) public rewards;

    // blanceOf : keeps tracks of balance of the stakers
    mapping(address => uint) public balanceOf;


    // Contract Deployer
    address owner;


    // Constructor
    constructor(IERC20 token_){
        token = token_;
        owner = msg.sender;
    }

        // modifier
    modifier onlyOwner{
        require(owner == msg.sender);
        _;
    }

    // Function that deposits 50% of total supply to the staking contract.
    function trf() public onlyOwner {
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

        (bool success) = token.transferFrom(msg.sender, address(this), _amount);

        if (success) {
            totalStaked += _amount;
            balanceOf[msg.sender] += _amount;
            // if this is a first stake, set staking time as well as the amount
            if(positions[msg.sender].stakedAmount == 0){
                positions[msg.sender].stakedAmount = _amount;
                positions[msg.sender]. stakedTime = block.timestamp;

            } else {
                // Increase stakedAmount
                positions[msg.sender].stakedAmount += _amount;
            }
        }
        // update Rewards earned.
        calculateAccuredReward();
        
    }
    
    // Function to Calculate Accurued Rewards
    function calculateAccuredReward() public { 
        uint difference = (block.timestamp - positions[msg.sender].stakedTime);
      
        //formula to calculate your reward earned
       uint reward =  ( rewardRate * balanceOf[msg.sender] * difference)/  (totalStaked) ;
       rewards[msg.sender] +=  reward;
       positions[msg.sender].totalRewards += rewards[msg.sender];
    }


    function getRewards() external view returns (uint){
        return rewards[msg.sender];
    }

    function getBalanceStaked() public view returns (uint){
        return balanceOf[msg.sender];
    }

}
