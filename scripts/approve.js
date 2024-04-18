const {ethers} = require('hardhat');

async function main(){
    const Ostake = await ethers.getContractAt('Ostake', '0x4Af9f320fE64C09a59572B6F687B308278367D61', await ethers.getSigners()[1]);
    console.log(await Ostake.approve('0x1F8B0Ab82C79bDBB02AbB87F6681a464CF24D50A', ethers.parseEther('50000000')));
    console.log('done')

}
main();