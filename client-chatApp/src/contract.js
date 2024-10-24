import { ethers } from "ethers";
import DChatAppAbi from "./contracts/DChatApp.json";

const contractAddress = "0xb0B08Ec1610f14743b73CAcF371EF0BCD05b7cb5";

export const getContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      DChatAppAbi.abi,
      signer
    );
    console.log(contract);
    return contract;
  } else {
    console.error("Ethereum wallet is not connected");
    return null;
  }
};

export const sendMessage = async (receiver, content) => {
  try {
    const contract = await getContract();
    if (!contract) {
      console.error("Contract not found");
      return;
    }
    const tx = await contract.sendMessage(receiver, content);
    await tx.wait();
    console.log("Message sent!");
  } catch (error) {
    console.error(error);
  }
};

export const getMessagesWithUser = async (user) => {
  try {
    const contract = await getContract();
    const messages = await contract.getMessagesWithUser(user);
    return messages;
  } catch (error) {
    console.error(error);
  }
};
