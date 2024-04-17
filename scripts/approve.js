const {ethers} = require('hardhat');

async function main(){
    const Ostake = await ethers.getContractAt('Ostake', '0x4631BCAbD6dF18D94796344963cB60d44a4136b6', await ethers.getSigners()[1]);
    console.log(await Ostake.approve('0x86A2EE8FAf9A840F7a2c64CA3d51209F9A02081D', 600000000));
    console.log('done')

}
main();