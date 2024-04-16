const { ethers } = require('hardhat');


async function main() {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.waitForDeployment()

    const StakingContract = await ethers.getContractFactory("StakingContract");
    const staking = StakingContract.deploy(await token.getAddress());

    console.log("Staking Contract deployed to: ", (await staking).target);
    console.log("Contract Deployed to Address:", await token.getAddress());
  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  