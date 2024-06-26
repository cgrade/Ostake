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

    // =============--------EVENTS
    event Stake(address indexed _address, uint _amount);
    event Unstake(address indexed _address, uint _amount);
    event RewardsClaimed(address indexed _address, uint _amount);
  

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

    // Approve Token
    function approveToken(uint256 amount) public {
        token.approve(address(this), amount);
    }

    // Function that deposits 50% of total supply to the staking contract.
    function trf() public onlyOwner {
        _trf();
    }
    
    function _trf() internal {
        approveToken(50000000 * 10 ** 18);
        token.safeTransferFrom(msg.sender, address(this), 50000000 * 10 ** 18 );
    }



    // STAKE FUNCTIONS

    function stake(uint _amount) external {
        require(token.balanceOf(msg.sender) > _amount, "Insufficient funds");

        // this allows the transfer of tokens from wallet to be greater than 0
        require(_amount > 0, "Staking Amount must be greater than Zero(0)");

        approveToken(_amount);

        token.safeTransferFrom( msg.sender, address(this), _amount);

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

        // update Rewards earned.
        calculateAccuredReward();

        // emit the stake event
        emit Stake(msg.sender, _amount);
        
    }

    function unstake(uint _amount) external {

        //check if their's a position for this user
        require(positions[msg.sender].stakedAmount > 0, 'You must stake first before you can unstake');

        // check if user has enough balance to withdraw
        require(balanceOf[msg.sender] > _amount, 'this amount is more than the staked amojnt');

        // calculate Reeward accured
        calculateAccuredReward();

        // Initiate the withdrawal (from SC to EOA)

        token.transfer( msg.sender, _amount);

        // emit unstake event
        emit Unstake(msg.sender, _amount);

        // update balances [balanceOf, positions, totalStaked]
        balanceOf[msg.sender] -= _amount;
        positions[msg.sender].stakedAmount -= _amount;
        totalStaked -= _amount;

    }

    function claimRewards() public {
        // Must be a Staker [poistions]
        require(positions[msg.sender].stakedAmount > 0, "You are not a Staker");

        // Calculate Accured Rewards
        calculateAccuredReward();

        // check if there's any rewards
        require (positions[msg.sender].totalRewards > 1, 'Minimum to Claim is 1 OST tokens');

        // Deduct from the reward pool and send to EOA
        token.transfer(msg.sender, positions[msg.sender].totalRewards);

        // emit the event
        emit RewardsClaimed(msg.sender, positions[msg.sender].totalRewards);

        // Update Values [positions.rewards]
        positions[msg.sender].totalRewards = 0;
        rewards[msg.sender] = 0;
 
    }


    /*---------------------HELPER FUNCTIONS ---------------------- */

    
    // Function to Calculate Accurued Rewards
    function calculateAccuredReward() public { 
        uint difference = (block.timestamp - positions[msg.sender].stakedTime);
      
        //formula to calculate your reward earned
       uint reward =  ( rewardRate * balanceOf[msg.sender] * difference)/  (totalStaked) ;
       rewards[msg.sender] +=  reward;
       positions[msg.sender].totalRewards += rewards[msg.sender];
    }

    // Get the Rewards earned by user
    function getRewards() external view returns (uint){
        return rewards[msg.sender];
    }

    // Get the amount staked by the user
    function getBalanceStaked() public view returns (uint){
        return balanceOf[msg.sender];
    }


}
