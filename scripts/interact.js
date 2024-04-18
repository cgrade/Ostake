const { ethers } = require('hardhat');

async function main(){
    const owner = await ethers.getSigners()[1];
    const StakingContract = await ethers.getContractAt("StakingContract", "0x1F8B0Ab82C79bDBB02AbB87F6681a464CF24D50A", owner );

    const Ostake = await ethers.getContractAt("Ostake", "0x4Af9f320fE64C09a59572B6F687B308278367D61", owner);


    // await StakingContract.trf();
    console.log('Balance of Staking Contract:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    // await StakingContract.stake(ethers.parseEther("2000"));
    // console.log('Just staked 2000');
    // console.log('Balance of Staking Contract After Staking:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    console.log('rewards for user', `${await StakingContract.getRewards()} OST`);
    console.log('total staked in the contract', await StakingContract.totalStaked());
    // // console.log('balance of OST token in my wallet', await StakingContract.getBalance());
    // console.log(await StakingContract.getRetunrPTK())
    // console.log(await StakingContract.d)

    // console.log('total staked', await StakingContract.totalStaked());
}

main();