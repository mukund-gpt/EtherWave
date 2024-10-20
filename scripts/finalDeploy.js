const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy();

  await contract.deployed();
  console.log("Address of contract :", await contract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
