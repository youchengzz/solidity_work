require("@nomicfoundation/hardhat-toolbox")
require("@chainlink/env-enc").config()
require("./tasks")
require("hardhat-deploy")

const SEPOLIA_API_URL = process.env.SEPOLIA_API_URL
const INFURA_API_URL = process.env.INFURA_API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2
const ETHERS_API_KEY = process.env.ETHERS_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: {
      sepolia: ETHERS_API_KEY
    }
  },
  networks: {
    sepolia: {
      url: SEPOLIA_API_URL,
      accounts : [PRIVATE_KEY, PRIVATE_KEY_2]
    },
    infura: {
      url: INFURA_API_URL,
      accounts : [PRIVATE_KEY, PRIVATE_KEY_2]
    }
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    }
  }
};
