import { abi as tokenAbi } from '../contracts/Ostake.json';
import {abi as stakeAbi } from '../contracts/StakingContract.json';

const tokenCA = '0x4908B2f2390013ed2652407eC080F5EA536AfA90';
const stakeCA = '0x6B4945eDA00a33ba20B2D88fd18f565C11259e5a';


const tokenData = {
    abi: tokenAbi,
    ca: tokenCA    
}

const stakeData = {
    abi: stakeAbi,
    ca: stakeCA
}


export {
    tokenData, stakeData
}