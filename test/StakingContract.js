const { expect } = require("chai");
const {ethers} = require('hardhat');

describe("StakingContract", function (){
  this.beforeEach(async () => {
    Token = await ethers.getContractFactory("Ostake");
    Staking = await ethers.getContractFactory("StakingContract");

    token = await Token.deploy();
    staking = await Staking.deploy(await token.getAddress());

    await token.approve(await staking.getAddress(), ethers.parseEther('50000000'));
  });

  describe("Deployment", function(){

    // Check if token is present
    it("should check if token is in the contract", async function(){
      expect(await staking.token()).to.equal(await token.getAddress());
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

    it("TotalStaked Balance should increment by staking amount", async function(){
      await staking.stake(ethers.parseEther('2000'));
      await staking.stake(ethers.parseEther('2000'));
      console.log('balance stakded', ethers.formatUnits(await staking.getBalanceStaked()))
      console.log('rewards', ethers.formatUnits(await staking.getRewards()));

    })

  })

})