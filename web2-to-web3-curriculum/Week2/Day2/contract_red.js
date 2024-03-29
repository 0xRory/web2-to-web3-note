import 'dotenv/config';
import { ethers } from 'ethers';
import sanfordNFTABI from './abi/NFT.js';
import { getProvder, getSigner } from './utils.js';
const sanfordNFTAddress = "0xCcB88EE64cc6B0C50430fd49F1c7144eAf8323A1";
const sepoliaProvider = getProvder();
const sepoliaSinger = getSigner();

const Contract = new ethers.Contract(sanfordNFTAddress, sanfordNFTABI, sepoliaSinger);

const _currentId = await Contract.getCurrent();
console.log('_currentId', _currentId);