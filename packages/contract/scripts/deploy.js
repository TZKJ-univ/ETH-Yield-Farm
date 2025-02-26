const hre = require("hardhat");
const web3 = require("web3");

async function main(){
    const [deployer] = await hre.ethers.getSigners();

    const daitokenContractFactory = await hre.ethers.getContractFactory("DaiToken");
    const dapptokenContractFactory = await hre.ethers.getContractFactory("DappToken");
    const tokenfarmContractFactory = await hre.ethers.getContractFactory("TokenFarm");

    const daiToken = await daitokenContractFactory.deploy();
    const dappToken = await dapptokenContractFactory.deploy();
    const tokenFarm = await tokenfarmContractFactory.deploy(dappToken.address, daiToken.address);

    await dappToken.transfer(
      tokenFarm.address,
      web3.utils.toWei("1000000", "ether")
    );

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("DaiToken deployed to:", daiToken.address);
    console.log("DappToken deployed to:", dappToken.address);
    console.log("TokenFarm deployed to:", tokenFarm.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}
);