//SPDX-License Identifier : MIT
pragma solidity ^0.8.0;


import './governance.sol';
import './reward.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";




/**
 * The Migrations contract does this and that...
 */
contract Staking{

    //declaring public variables

	ERC20 public immutable Governance;
    ERC20 public immutable Reward;
    address public owner;
    uint256 public apr;

    //mapping(address => uint256) public balances;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public time;
    mapping(address => bool) public claimed;

    bool public stakingEnded = false;
    uint256 public stakers;
    uint256 public _Supply;
    uint256 public claimers;
    uint256 public numberOfClaimed;
    uint256 public endedTime;

    //declaring constructor variables

    constructor(address _gov, address _rew) {
        owner = msg.sender;
        Governance = ERC20(_gov);
        Reward = ERC20(_rew);
    }

    //setting modifiers to make sure only the owner carry specific tasks
    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    //setting the staking APR which can only be called by the owner of the contract
    function setAPR(uint256 _apr) public onlyOwner returns(uint256){
    	apr = _apr;
    	return apr;
    }

    //@dev ending the staking when the time elapses
    function endStaking() public onlyOwner returns (bool){
    	stakingEnded = true;
        endedTime = block.timestamp;
    	return stakingEnded;

    }

    //users sending the governance tokens to the staking contract address to enable them stake
    function stake(uint256 amount) public {
    	require(!hasStaked[msg.sender], 'you have already staked');
    	require(!stakingEnded, 'Staking has ended');
    	ERC20(Governance)._approve(msg.sender, address(this), amount);
        ERC20(Governance).transferFrom(msg.sender, address(this), (amount));
        stakingBalance[msg.sender] += amount;
        if(hasStaked[msg.sender] == false){
            stakers += 1;

        }
        hasStaked[msg.sender] = true;

        //computing the rewards
        uint256 reward = (amount * apr * block.timestamp) / block.timestamp;
        rewards[msg.sender] += reward;
        _Supply = _Supply + amount;
        time[msg.sender] = block.timestamp;
    }


    //claiming the reward at the end of the staking quest
    function claim() public {
        require(!claimed[msg.sender], 'caller already claimed');
    	require(rewards[msg.sender] > 0, 'You did not take part in the staking event');
        require(time[msg.sender] > (time[msg.sender] + 91 days), 'Asset has to be staked for a minimum of 3 months');
        uint256 claimAble = (rewards[msg.sender] / stakers) * _Supply;
        ERC20(Reward).claimReward(msg.sender, claimAble);
        numberOfClaimed += claimAble;
        rewards[msg.sender] = 0;
        claimed[msg.sender] = true;
        claimers += 1;



    }

    //witdraw their staked governance tokens at the end of the staking period
    function withdraw() public {
    	require(stakingBalance[msg.sender] > 0, 'You have a zero balance in staking');
    	require(time[msg.sender] >= (time[msg.sender] + 91 days), 'Tokens has to be staked for a minimum of 3 months');
    	ERC20(Governance).transfer(msg.sender, stakingBalance[msg.sender]);
    	_Supply -= stakingBalance[msg.sender];
    	stakingBalance[msg.sender] = 0;
    	hasStaked[msg.sender] = false;
 
    }


    //if after the period of  months, the owner of the contract now claims all the uclaimed rewards
    function sendUnclaimed() public onlyOwner {
        //uint256 unclaimers = stakers.length - claimers;
        require(endedTime > block.timestamp + 90 days, 'Claiming is still ungoing');
        uint256 claimAble = (_Supply - numberOfClaimed) * _Supply;
        ERC20(Reward).claimReward(owner, claimAble);



    }



}



