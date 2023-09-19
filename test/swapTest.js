const {time, loadFixture,} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");





describe('Getting the staking contract ready for deployment', async() => {
  //const governance = await ethers.getContractFactory('Governance');
  //await governance.deploy();


  it('Should be able to echo the contract address to the console', async() =>{
    const Governance = await ethers.getContractFactory('Governance');
    governance = await Governance.deploy();

    console.log('The contract is deployed to the address ', governance.target)

  })

  it('Should be able to carry out certain functionality', async() =>{
     const Governance = await ethers.getContractFactory('Governance');
     governance = await Governance.deploy();


     await governance.transfer('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 34334)
    // const bal = await governance.balanceOf('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');

     const provider = await ethers.getSigners()
     await governance.increase('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 645646 );
     const bal = await governance.balanceOf('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
     const balsign = await governance.balanceOf(provider[0].address);
     const signer = await ethers;

    

     console.log('The signer address holds a total of ', balsign, 'tokens')

     console.log('');
     console.log('Calling the burn function')

     console.log('Balance before burn :', balsign)

     console.log('Burner wallet balance before :', await governance.balanceOf('0x0000000000000000000000000000000000000000'));

     //await governance.burn(5445)
     const balAfter = await governance.balanceOf(provider[0].address)
     console.log('Balance after burn :', balAfter)


     
     console.log('Burner wallet balance after burn :', await governance.balanceOf('0x0000000000000000000000000000000000000000'))

     const Reward = await ethers.getContractFactory('Reward');
     reward = await Reward.deploy()

     govTarget = governance.target;
     rewTarget = reward.target;



     console.log('Checking staking functionality');
     const Staking = await ethers.getContractFactory('Staking');
     staking = await Staking.deploy(govTarget, rewTarget);
     console.log('The address of the staking contract is', staking.target);
     console.log('The balance of the contract balance before staking', await governance.balanceOf(staking.target));

     console.log('The address of the staking contract deployer is', provider[0].address);
     console.log('The balance of the contract deployer before staking', await governance.balanceOf(provider[0].address));

     console.log('No. of tokens staked in the contract before the commencement of staking is', await governance.balanceOf(staking.target));
     //await governance.increase(provider[2].address, 4554545)
     //await governance.increase(provider[2].address, 4554545)
    // await governance.increase(provider[2].address, 4554545)

     await staking.setAPR(100)
     await staking.stake(343);

     console.log('The address of the contract balance after staking', governance.target);
     console.log('The balance of the contract deployer after staking', await governance.balanceOf(staking.target));
     console.log('The balance of the contract before withdrawal', await governance.balanceOf(staking.target));
     console.log('No. of tokens staked in the contract after the commencement of staking is', await staking._Supply());

     console.log('The balance of the contract owner before withdrawal', await governance.balanceOf(provider[0].address));
     
     console.log('Checking the apr ', await staking.apr());
     console.log('The rewards accrued by the caller is', await staking.rewards(provider[0].address));
    

      console.log('No. of tokens staked in the contract after withdrawal', await staking._Supply());
      console.log('The balance of the contract before withdrawal', await governance.balanceOf(staking.target));
      await staking.withdraw();
      console.log('The balance of the contract after withdrawal', await governance.balanceOf(staking.target));
      console.log('Checking whether the caller has staked or not', await staking.hasStaked(provider[0].address));

    await staking.sendUnclaimed();

    //const accountII = await ethers.getSigner(provider[0]);
    const deployer = staking.connect(provider[0]);
    const accountI = staking.connect(provider[1]);
    const accountII = staking.connect(provider[2]);
    const accountIII = staking.connect(provider[3]);
    const accountIV = staking.connect(provider[4]);
    const accountV = staking.connect(provider[5]);


    await governance.increase(accountII.runner.address, 4554545)
    await staking.connect(accountII.runner).stake(3445);

    //await staking.connect(provider[0].address).sendUnclaimed()
    console.log('The balance of the contract deployer for the reward after withdrawal', await reward.balanceOf(provider[0].address));
    console.log('Contract balance after initial staking is ', await governance.balanceOf(staking.target))

    await governance.increase(accountIII.runner.address, 545)
    await governance.increase(accountIV.runner.address, 545)
    await governance.increase(accountV.runner.address, 545)

    await staking.connect(accountIII.runner).stake(365645);
    await staking.connect(accountIV.runner).stake(365645);
    await staking.connect(accountV.runner).stake(365645);

    console.log('Contract balance after final staking is ', await reward.balanceOf(staking.target))

    await staking.connect(deployer.runner).claim()
    await staking.connect(accountII.runner).claim()
    console.log('Number of stakers is ', await staking.stakers())

    console.log('Balance after claiming is ', await reward.balanceOf(deployer.runner.address))
    console.log('Balance after claiming is of accountII ', await reward.balanceOf(accountII.runner.address))






    

  })





  
})
