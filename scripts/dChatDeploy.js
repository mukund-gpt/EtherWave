const hre = require("hardhat");

async function main() {
  const DChatApp = await hre.ethers.getContractFactory("DChatApp");
  const contract = await DChatApp.deploy();

  await contract.deployed();
  console.log("Address of contract :", await contract.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//   Address of contract : 0xb0B08Ec1610f14743b73CAcF371EF0BCD05b7cb5
