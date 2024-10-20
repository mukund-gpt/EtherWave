/* require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18", // Set the Solidity version
  networks: {
    linea_sepolia: {
      url: process.env.LINEA_SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
 */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { PRIVATE_KEY, INFURA_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.19",
  networks: {
    linea_sepolia: {
      url: `https://linea-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    /* linea_mainnet: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    }, */
  },
};