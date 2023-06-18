import 'dotenv/config';
import { ethers } from 'ethers';
import sanfordNFTABI from './abi/NFT.js';
import { getSigner } from './utils.js';
const sanfordNFTAddress = "0xCcB88EE64cc6B0C50430fd49F1c7144eAf8323A1";
const sepoliaSinger = getSigner();

const Contract = new ethers.Contract(sanfordNFTAddress, sanfordNFTABI, sepoliaSinger);

console.log('Mint Start....');
const Tx = await Contract.safeMint(await sepoliaSinger.getAddress(), 'https://ipfs.io/ipfs/');

console.log('Mint Sucess...');

console.log(Tx.hash);
const url = await Contract.tokenURI(0);
console.log(url);