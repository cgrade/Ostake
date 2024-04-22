const { ethers } = require('hardhat');

async function main(){
    const owner = await ethers.getSigners()[0];
    const StakingContract = await ethers.getContractAt("StakingContract", "0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00", owner );

    const Ostake = await ethers.getContractAt("Ostake", "0x9d4454B023096f34B160D6B654540c56A1F81688", owner);


    // await StakingContract.trf();
    console.log('Balance of Staking Contract:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    // await StakingContract.stake(ethers.parseEther("20"));
    // console.log('Just staked 20');
    // console.log('Balance of Staking Contract After Staking:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    await StakingContract.calculateAccuredReward();
    console.log('rewards for user', `${ethers.formatUnits(await StakingContract.getRewards())}OST`);
    console.log('total staked in the contract', ethers.formatUnits(await StakingContract.totalStaked()));
    console.log('balance of OST token staked', ethers.formatUnits(await StakingContract.getBalanceStaked()));
    await StakingContract.unstake(ethers.parseEther('10'));

    console.log('Just unstaked 20 OST tokens');
    console.log('Balance left after unstaking', await StakingContract.getBalanceStaked());
    // console.log(owner)

    // console.log(await StakingContract.())
    // console.log(await StakingContract.d)

    // console.log('total staked', await StakingContract.totalStaked());
}

main();