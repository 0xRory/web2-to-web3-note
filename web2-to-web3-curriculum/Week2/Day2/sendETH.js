import 'dotenv/config';
import { ethers } from 'ethers';
import { getProvder, getSigner } from './utils.js';

const sepoliaProvider = getProvder();
const sepoliaSinger = getSigner();

const address = await sepoliaSinger.getAddress();

console.log('address', address);
// ethers 6 明確分開singiner 和 provider, singiner EIP-721
const myBalance = await sepoliaProvider.getBalance(address);

// 人看得懂的格式 ethers.formatEther
console.log('myBalance', ethers.formatEther(myBalance));
// 這裡又特別慎重的表示不要將您的 註記詞與私鑰透露。
// //const toAddress = await provider.resolveName("0xroryyy.eth");
// const sandfordAddress = process.env.SEND_WALLET;
// // 傳送交易
const tx = await sepoliaSinger.sendTransaction({
  to: process.env.SEND_WALLET,
  value: ethers.parseEther('0.001'), // 這裡記得要轉換成 wei
});

console.log('send tx ', tx);
await tx.wait(); // 等待交易完成

console.log('tx complete');
