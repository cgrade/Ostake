const {ethers} = require('hardhat');

async function main(){
    const deployer = await ethers.getSigners()[0]
    const Ostake = await ethers.getContractAt('Ostake', '0x4908B2f2390013ed2652407eC080F5EA536AfA90', deployer);

    console.log(await Ostake.approve('0x6B4945eDA00a33ba20B2D88fd18f565C11259e5a', ethers.parseEther('50000000')));
    const Staking = await ethers.getContractAt('StakingContract', '0x6B4945eDA00a33ba20B2D88fd18f565C11259e5a', deployer);
    // console.log(await Staking.approve(ethers.parseEther('200')))
    // console.log(await Ostake.approve(await ethers.getSigners()[1], ethers.parseEther('500')));
    console.log('done')

}
main()
    .then(() => process.exit(0))
    .catch(error => {
    console.error(error);
    process.exit(1);
    });





