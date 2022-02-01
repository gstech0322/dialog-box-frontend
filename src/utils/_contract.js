import Web3 from "web3";
import artTokenContractABI from "../config/abis/artToken.json";

const web3 = new Web3(Web3.givenProvider);
web3.eth.transactionBlockTimeout = 1000;

export const _Contract = new web3.eth.Contract(
    artTokenContractABI.abi,
    process.env.REACT_APP_CONTRACT_ADDRESS
);