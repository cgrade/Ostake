const { ethers } = require('hardhat');



async function main() {
    // const Token = await ethers.getContractFactory("Ostake");
    // const token = await Token.deploy();
    // const receipt =  await token.waitForDeployment()

    const StakingContract = await ethers.getContractFactory("StakingContract");
    const tokenAddy = '0x2cECa4BF0e4D43Ab267F92022f24d4551386BaE1'
    const staking = await StakingContract.deploy(tokenAddy);
    await staking.waitForDeployment();

    // const StakingContract = await ethers.getContractFactory("StakingContract");
    // const staking = StakingContract.deploy(await token.getAddress());

    // console.log("Staking Contract deployed to: ", (await staking).target);
    console.log("Contract Deployed to Address:", await staking.getAddress());
    console.log(receipt )
    // console.log("staking contract deployed to Address:", await staking.getAddress());

  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  