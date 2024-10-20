// scripts/deploy.js
const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  // return hre.ethers.formatEther(balance);
  return hre.ethers.utils.formatEther(balance);
}

async function consoleBalance(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(
      `${counter} Address: ${address} Balance: ${await getBalance(address)}`
    );
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const name = memo.name;
    const message = memo.message;
    const timestamp = memo.timestamp;
    const from = memo.from;
    console.log(
      `Name: ${name} Message: ${message} Timestamp: ${timestamp} From ${from}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy();

  await contract.deployed();
  console.log("Address of contract :", await contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("before buy me a chai");
  await consoleBalance(addresses);

  // const amount = { value: hre.ethers.parseEther("1") };
  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyChai("A", "very nice", amount);
  await contract.connect(from2).buyChai("B", "very good", amount);
  await contract.connect(from3).buyChai("C", "wow ", amount);

  console.log("after buy me a chai");
  await consoleBalance(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
