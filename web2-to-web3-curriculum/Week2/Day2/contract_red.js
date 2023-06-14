import 'dotenv/config';
import { ethers } from 'ethers';

const sanfordNFTAddress = "0x8A94593BF97EB329F412B60389A1C26d53dbB636";
const sanfordNFTABI = "";
const sepoliaProvider = getProvder();
const sepoliaSinger = getSigner();

new ethers.Contract(sanfordNFTAddress, sanfordNFTABI, provider);

// ex:sanfordstout.eth 
// ex:0x8A94593BF97EB329F412B60389A1C26d53dbB636
// https://blockscan.com //evm 其他的智能合約