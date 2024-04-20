const { ethers } = require('hardhat');

async function main(){
    const owner = await ethers.getSigners()[1];
    const StakingContract = await ethers.getContractAt("StakingContract", "0x17a405D74A3EA82123DB52590a8aE729827Bb3d8", owner );

    const Ostake = await ethers.getContractAt("Ostake", "0x0e9E606349443b533347D443bA3E00FDa4D93690", owner);


    // await StakingContract.trf();
    console.log('Balance of Staking Contract:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    // await StakingContract.stake(ethers.parseEther("2000"));
    // console.log('Just staked 2000');
    // console.log('Balance of Staking Contract After Staking:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    await StakingContract.calculateAccuredReward();
    console.log('rewards for user', `${ethers.formatUnits(await StakingContract.getRewards())}OST`);
    console.log('total staked in the contract', ethers.formatUnits(await StakingContract.totalStaked()));
    console.log('balance of OST token staked', ethers.formatUnits(await StakingContract.getBalanceStaked()));
    // console.log(await StakingContract.())
    // console.log(await StakingContract.d)

    // console.log('total staked', await StakingContract.totalStaked());
}

main();