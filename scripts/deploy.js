const { ethers } = require('hardhat');



async function main() {
    // const Token = await ethers.getContractFactory("Ostake");
    // const token = await Token.deploy();
    // await token.waitForDeployment()

    const StakingContract = await ethers.getContractFactory("StakingContract");
    const tokenAddy = '0x4908B2f2390013ed2652407eC080F5EA536AfA90'
    const staking = await StakingContract.deploy(tokenAddy);
    await staking.waitForDeployment();

    // c
    // console.log("Token Deployed to Address:", await token.getAddress());
    console.log("staking contract deployed to Address:", await staking.getAddress());

  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  