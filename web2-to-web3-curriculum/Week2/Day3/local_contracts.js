import sanfordNFTABI from './abi/NFT.js';
import { ethers } from 'ethers';
import { getProvder, getSigner } from './utils.js';

const localProvider = getProvder('local');
const localSinger = getSigner('local');
const address = await localSinger.getAddress();
const to_address = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65';

console.log('address', address);
// ethers 6 明確分開singiner 和 provider, singiner EIP-721
const myBalance = await localProvider.getBalance(address);
// 人看得懂的格式 ethers.formatEther
console.log('myBalance', ethers.formatEther(myBalance));

// 傳送交易
const tx = await localSinger.sendTransaction({
	to: to_address,
	value: ethers.parseEther('0.001'), // 這裡記得要轉換成 wei
});

console.log('send tx ', tx);
await tx.wait(); // 等待交易完成

console.log('tx complete');

const sanfordNFTAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';

const Contract = new ethers.Contract(
	sanfordNFTAddress,
	sanfordNFTABI,
	localSinger
);
getNFTCurrentId(Contract);

console.log('Mint Start....');
const Tx = await Contract.safeMint(
	await localSinger.getAddress(),
	'https://ipfs.io/ipfs/'
);

console.log('Mint Sucess...');

console.log(Tx.hash);
const url = await Contract.tokenURI(0);
console.log(url);

getNFTCurrentId(Contract);

async function getNFTCurrentId(Contract) {
	const _currentId = await Contract.getCurrent();
	console.log('_currentId', _currentId);
}
