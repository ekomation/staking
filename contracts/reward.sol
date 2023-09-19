//SPDX-License Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Reward is ERC20{

	address public owner;
    constructor() ERC20("Governance Reward", "REW") {
    	owner = msg.sender;
       // _mint(msg.sender, 1 * (10 ** 18));

    }

    modifier onlyOwner() { 
    	require (msg.sender == owner); 
    	_; 
    }

    function claimReward(address recipient, uint256 amount) public virtual override {
       _mint(recipient, amount * (10**18));
    }    



    function burn(uint256 amount) public {
    	_burn(msg.sender, amount * (10 ** 18));
    }

}
