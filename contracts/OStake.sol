// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Ostake is ERC20 {

    //Create a variable for our faucet
    uint256 drip = 20 * 10 ** 18; // ether =  1 * (10 ** 18) 

    //Mapping to Keep Track of the Time Each Wallet Requests
    mapping (address => uint256) public addressTime;

    constructor() ERC20("OStake", "OST") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    //Users can claim a token from my token faucet - get users to keep coming back to your site
    function faucet() external {
        // Requirement to make each wallet wait a specific amount of time
        require(addressTime[msg.sender] < block.timestamp, "need to wait more time");
        //Let the user claim a token
        _mint(msg.sender, drip);
        //Update the address time, to make them wait the set amount of time
        addressTime[msg.sender] = block.timestamp + 1 hours;  // Can use seconds, minutes, hours, days, etc
    }
    
}