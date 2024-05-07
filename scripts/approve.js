const {ethers} = require('hardhat');

async function main(){
    const deployer = '0x6D23E53ba11a026FF1CFF1bE81185325052020aa'
    const Ostake = await ethers.getContractAt('Ostake', '0x2cECa4BF0e4D43Ab267F92022f24d4551386BaE1', deployer);

    console.log(await Ostake.approve('0x2C666a309B53675FF0906a61568C5825A61a34e3', ethers.parseEther('50000000')));
    const Staking = await ethers.getContractAt('StakingContract', '0x2C666a309B53675FF0906a61568C5825A61a34e3', deployer);
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
