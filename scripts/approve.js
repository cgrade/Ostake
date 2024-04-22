const {ethers} = require('hardhat');

async function main(){
    const Ostake = await ethers.getContractAt('Ostake', '0x9d4454B023096f34B160D6B654540c56A1F81688', await ethers.getSigners()[0]);
    console.log(await Ostake.approve('0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00', ethers.parseEther('50000000')));
    const Staking = await ethers.getContractAt('StakingContract', '0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00', await ethers.getSigners()[0]);
    console.log(await Staking.approve(ethers.parseEther('200')))
    // console.log(await Ostake.approve(await ethers.getSigners()[1], ethers.parseEther('500')));
    console.log('done')

}
main();