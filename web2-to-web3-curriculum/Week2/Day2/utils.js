import 'dotenv/config';
import { ethers } from 'ethers';

// 新增 測試網 和 正式網設定切換 function
const getProvder = (mainnet = false) => {
  const infuraId = process.env.INFURA_ID;
  const provderUrl = mainnet
    ? `https://mainnet.infura.io/v3/${infuraId}`
    : `https://sepolia.infura.io/v3/${infuraId}`


  //console.log('provderUrl', provderUrl);
  return new ethers.JsonRpcProvider(provderUrl);

}

// const provder = getProvder();
// // 印出來目前的網路
// const network = await provder.getNetwork();

// console.log('network', network.toJSON());


const generateWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  // 請注意我們建立錢包的時候絕對不會呈現出來私鑰，這是非常不安全的
  // 這裡只是為了方便大家看到結果，所以才會印出來
  // 請記得養成好習慣
  //console.log('address:', wallet.address); //地址
  //console.log('privateKey:', wallet.privateKey); //私鑰
  // console.log('mnemonic:', wallet.mnemonic.phrase); //註記詞
}

//generateWallet();

const getSigner = (mainnet = false) => {
  const provder = getProvder();
  return new ethers.Wallet(process.env.MY_WALLET_KEY, provder);
};
// 取得簽名持有扯
//const signer = getSigner();
// 呈現地址
//console.log('signer', await signer.getAddress());


export { getProvder, generateWallet, getSigner }