import 'dotenv/config';
import { ethers } from 'ethers';

// 新增 測試網 和 正式網設定切換 function
const getProvder = (local = 'local') => {
	const infuraId = process.env.INFURA_ID;
	let provderUrl = '';
	switch (local) {
		case 'mainnet':
			provderUrl = `https://mainnet.infura.io/v3/${infuraId}`;
			break;
		case 'testnet':
			provderUrl = `https://sepolia.infura.io/v3/${infuraId}`;
			break;
		default:
			provderUrl = 'http://127.0.0.1:8545';
	}

	return new ethers.JsonRpcProvider(provderUrl);
};

const getSigner = (local = 'local') => {
	const provder = getProvder(local);
	return new ethers.Wallet(
		'0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
		provder
	);
};
// 取得簽名持有扯
//const signer = getSigner();
// 呈現地址
//console.log('signer', await signer.getAddress());

export { getProvder, generateWallet, getSigner };
