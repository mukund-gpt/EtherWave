import { useEffect } from "react";
import { ethers } from "ethers";
import abi from "./../contract/chai.json";

const useWalletConnection = (setState, setAccount) => {
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x65AFE79Db683f65013D5eC2c407CcBCdb8d6367d";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Please install Metamask");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setAccount(accounts[0]);
        setState({ provider, signer, contract });

        const handleChainChanged = () => window.location.reload();
        const handleAccountsChanged = () => window.location.reload();

        window.ethereum.on("chainChanged", handleChainChanged);
        window.ethereum.on("accountsChanged", handleAccountsChanged);

        return () => {
          window.ethereum.removeListener("chainChanged", handleChainChanged);
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
        };
      } catch (error) {
        console.error(error);
      }
    };

    connectWallet();
  }, [setState, setAccount]);
};

export default useWalletConnection;
