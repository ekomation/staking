//SPDX-License Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Governance is ERC20{

	address public owner;
    uint constant _initial_supply = 20000000 * (10**18);
    constructor() ERC20("Governance", "GOV") {
    	owner = msg.sender;
    	_mint(msg.sender, _initial_supply);

    }

    modifier onlyOwner() { 
    	require (msg.sender == owner); 
    	_; 
    }
    

    function increase(address recipient, uint256 amount) public onlyOwner {
    	_mint(recipient, amount * (10**18));

    }


    function burn(uint256 amount) public {
    	_burn(msg.sender, amount * (10 ** 18));
    }

}
