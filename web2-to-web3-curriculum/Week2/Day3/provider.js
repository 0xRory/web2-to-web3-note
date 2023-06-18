import 'dotenv/config';
import { ethers } from 'ethers';

const infuraId = process.env.INFURA_ID;

const localNode = `http://127.0.0.1:8545`;
const infuraUrl = `https://mainnet.infura.io/v3/${infuraId}`;

const infuraProvider = new ethers.JsonRpcProvider(infuraUrl);
const provider = new ethers.JsonRpcProvider(localNode);

// 這邊我們可以看到，我們可以透過 provider 來取得我們想要的資訊。
const infura_blocknumber = await infuraProvider.getBlockNumber();
console.log('Current infura block Number.', infura_blocknumber);
const blocknumber = await provider.getBlockNumber();
console.log('Current block Number.', blocknumber);

const address = await provider.resolveName('xxxx.eth');
console.log('xxxx.eth ', address);
