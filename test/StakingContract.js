const { expect } = require("chai");
const {ethers} = require('hardhat');

describe("StakingContract", function (){
  this.beforeEach(async () => {
    tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    Token = await ethers.getContractFactory("Token");
    Staking = await ethers.getContractFactory("StakingContract");

    token = await Token.deploy();
    staking = await Staking.deploy(await token.getAddress());
  });

  describe("Deployment", function(){

    // Check if token is present
    it("should check if token is in the contract", async function(){
      expect(await staking.token()).to.equal(tokenAddress);
    })

    // Check if totalStaked is 0
    it("should check if totalStaked is 0 Zero", async function (){
      expect(await staking.totalStaked()).to.equal(0);
    })

    // Check if RewardRate is per seconds is 11600000000000 WEI
    it("should check if Reward Rate per Sec is 11600000000000 WEI", async function(){
      expect(await staking.rewardRate()).to.equal(11600000000000);
    })

  })

})