const {ethers} = require('hardhat');

async function main(){
    const Ostake = await ethers.getContractAt('Ostake', '0x0e9E606349443b533347D443bA3E00FDa4D93690', await ethers.getSigners()[1]);
    console.log(await Ostake.approve('0x17a405D74A3EA82123DB52590a8aE729827Bb3d8', ethers.parseEther('50000000')));
    console.log('done')

}
main();