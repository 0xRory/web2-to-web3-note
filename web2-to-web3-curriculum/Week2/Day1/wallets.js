import 'dotenv/config';
import { ethers } from 'ethers';
// 建立錢包
const wallet = await ethers.Wallet.createRandom();

console.log('address:', wallet.address); //地址
console.log('privateKey:', wallet.privateKey); //私鑰
console.log('mnemonic:', wallet.mnemonic.phrase); //註記詞

let path, myWallet;
// 用這的的方法會發現註記詞都一樣，但地址不同
// 但實際上你導入 狐狸錢包那是不可行的 哈哈他一樣只會給你顯示一個
for (let index = 0; index < 10; index++) {
  path = `m/44'/60'/0'/0/${index}`;
  console.log(wallet.mnemonic.phrase)
  myWallet = ethers.HDNodeWallet.fromMnemonic(wallet.mnemonic, path);
  console.log('my_address:', index, myWallet.address);
  console.log('my_privateKey:', index, myWallet.privateKey);
  console.log('my_mnemonic:', index, myWallet.mnemonic.phrase);
}

const infuraId = process.env.INFURA_ID;
const infuraUrl = `https://mainnet.infura.io/v3/${infuraId}`;
const provider = new ethers.JsonRpcProvider(infuraUrl);

let bbb = await provider.getBlockNumber();
console.log(bbb);
// 這裡記得私鑰要自己保管好，不然就會被盜走了。然後也放到環境變數
//console.log(process.env.MY_WALLET_KEY);
// 連結寫法
// wallect.connect(provider); 寫法 1
const wallect = new ethers.Wallet(process.env.MY_WALLET_KEY, provider); //寫法 2
console.log(wallect);
// 連結寫法


let signature = await wallect.signMessage('Hola!')
console.log('Sign message: ', signature);
// 驗證
console.log('verifyMessage: ', ethers.verifyMessage('Hola!', signature));

const toAddress = await provider.resolveName("0xroryyy.eth");
// 傳送交易
const tx = await wallect.sendTransaction({
  to: toAddress,
  value: ethers.parseEther('0.001'), // 這裡記得要轉換成 wei
});

console.log('send tx ', tx);
await tx.wait(); // 等待交易完成

console.log('tx complete');
