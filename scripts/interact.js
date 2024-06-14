const { ethers } = require('hardhat');

async function main(){
    const owner = await ethers.getSigners()[0];
    const StakingContract = await ethers.getContractAt("StakingContract", "0x6B4945eDA00a33ba20B2D88fd18f565C11259e5a", owner );

    const Ostake = await ethers.getContractAt("Ostake", "0x4908B2f2390013ed2652407eC080F5EA536AfA90", owner);

   
    const stakeaddy = "0x6B4945eDA00a33ba20B2D88fd18f565C11259e5a"

    // console.log(StakingContract)
    console.log('Balance of Staking Contract:', await Ostake.balanceOf(stakeaddy))
    // await Ostake.approve(stakeaddy, ethers.parseEther('20000'))
    // await StakingContract.stake(ethers.parseEther('20000'));
    // await StakingContract.trf();
    // console.log('Balance of Staking Contract:', await Ostake.balanceOf(stakeaddy))
    // console.log('Just staked 20');
    // // console.log('Balance of Staking Contract After Staking:', ethers.formatUnits(await Ostake.balanceOf(StakingContract.getAddress())));
    // console.log('rewards for user', `${ethers.formatUnits(await StakingContract.getRewards())}OST`);
    // console.log('total staked in the contract', ethers.formatUnits(await StakingContract.totalStaked()));
    // console.log('balance of OST token staked', ethers.formatUnits(await StakingContract.getBalanceStaked()));
    // await StakingContract.unstake(ethers.parseEther('10'));

    // console.log('Just unstaked 20 OST tokens');
    // console.log('Balance left after unstaking', await StakingContract.getBalanceStaked());
    // // console.log(owner)

    // console.log(await StakingContract.())
    // console.log(await StakingContract.d)

    // console.log('total staked', await StakingContract.totalStaked());
}

main();