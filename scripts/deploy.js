const main = async() => {

  const signer = await ethers.getSigners();

  console.log('Deploying contract with the account', signer[0].address);
  console.log('Deployer balance : ', await signer[0].address.getBalance().toString())

  Token = ethers.getContractFactory('Governance');
  token = await Token.deploy()
  console.log('Token address :', token.target)


} 

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});