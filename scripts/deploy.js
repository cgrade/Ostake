const { ethers } = require('hardhat');


async function main() {
    const Token = await ethers.getContractFactory("Ostake");
    const token = await Token.deploy();
    await token.waitForDeployment()

    const StakingContract = await ethers.getContractFactory("StakingContract");
    const staking = await StakingContract.deploy(await token.getAddress());
    await staking.waitForDeployment();

    // const StakingContract = await ethers.getContractFactory("StakingContract");
    // const staking = StakingContract.deploy(await token.getAddress());

    // console.log("Staking Contract deployed to: ", (await staking).target);
    console.log("Token Deployed to Address:", await token.getAddress());
    console.log("staking contract deployed to Address:", await staking.getAddress());

    console.log(await staking.rewardRate());
    console.log(await token.getBalance)
  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  