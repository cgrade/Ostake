const { expect } = require("chai");
const {ethers} = require('hardhat');

describe("StakingContract", function (){
  this.beforeEach(async function() {
    Token = await ethers.getContractFactory("Ostake");
    Staking = await ethers.getContractFactory("StakingContract");

    token = await Token.deploy();
    staking = await Staking.deploy(await token.getAddress());

    await token.approve(await staking.getAddress(), ethers.parseEther('50000000'));
  });

  describe("Deployment", function(){

    // Check if token is present
    it("should check if token is in the contract", async function(){
      // expect(await staking.token()).to.equal(await token.getAddress());
    })

    // Check if totalStaked is 0
    it("should check if totalStaked is 0 Zero", async function (){
      expect(await staking.totalStaked()).to.equal(0);
    })

    // Check if RewardRate is per seconds is 11600000000000 WEI
    it("should check if Reward Rate per Sec is 11600000000000 WEI", async function(){
      expect(await staking.rewardRate()).to.equal(11600000000000);
    })

    // Check if it returns balance
    it("OST Token in the Staking Contract should be: 50,000,000", async function(){
      await staking.trf();
      expect(await token.balanceOf(staking.getAddress())).to.equal(ethers.parseEther('50000000'));

    })

  });

  describe("Stake and Unstake function", function(){

    it("TotalStaked Balance should increment by staking amount", async function(){
      await staking.stake(ethers.parseEther('2000'));
      await staking.stake(ethers.parseEther('2000'));
     expect(await staking.totalStaked()).to.be.equal(ethers.parseEther('4000'));

    })

    it("Should Unstake 200 OST tokens", async function(){
      await staking.stake(ethers.parseEther('500'));
      // await staking._approve(ethers.parseEther('500'));
      await staking.unstake(ethers.parseEther('200'));
      expect(await staking.getBalanceStaked()).to.be.equal(ethers.parseEther('300'));
    })
  });

  describe("Claim Rewards Function", function (){

    it("should claim all rewards and reset the rewards earned value", async function (){
      await staking.stake(ethers.parseEther('20'));
      await staking.stake(ethers.parseEther('20'));
      await staking.stake(ethers.parseEther('20'));
      await staking.stake(ethers.parseEther('20'));
      await staking.unstake(ethers.parseEther('50'));
      await staking.calculateAccuredReward();
      await staking.claimRewards();
      expect(await staking.getRewards()).to.be.equal(0)
      
    })

  })

})