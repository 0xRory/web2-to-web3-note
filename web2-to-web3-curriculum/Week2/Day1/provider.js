import 'dotenv/config';
import { ethers } from 'ethers';

/* 
  node v18.16.0
  npm install ethers dotenv;

  要先設定 Provider，才能進行後續的操作。
  ethers.AnkrProvider 
  ethers.InfuraProvider
  ethers.PocketProvider
  ethers.StaticJsonRpcProvider
  可以參考
    https://docs.ethers.org/v5/api-keys/

  通常我們會使用 InfuraProvider，因為它是免費的。
  但會建議去 https://app.infura.io/ 申請一個 key
  當然如果你要透過這樣的供應商，建議是找比較好或較好的供應商。
  測試一下 ...
  node provider.js
  // v6 寫法請直接參考官方文件
  v5 -> ethers.providers.JsonRpcProvider(infuraUrl);
  v6 -> ethers.JsonRpcProvider(infuraUrl);
*/

const infuraId = process.env.INFURA_ID;
const infuraUrl = `https://mainnet.infura.io/v3/${infuraId}`;

// 當然我們也可以使用 ethers.providers.JsonRpcProvider(infuraUrl);
const provider = new ethers.JsonRpcProvider(infuraUrl);
const providerInfur = new ethers.InfuraProvider('homestead', infuraId);

// 這邊我們可以看到，我們可以透過 provider 來取得我們想要的資訊。
const blocknumber = await provider.getBlockNumber();
console.log('Current block Number.', blocknumber);
// ens -> address
const address = await provider.resolveName("0xroryyy.eth");
console.log('0xroryyy.eth is', address);
//address -> ens
const ensName = await provider.lookupAddress(address);

console.log('0xbFc14BC72590eB653AF0873d3401Fac602942Ad3 is ', ensName);
// 目前金額 可以看到，其實你使用 address or ensName 都可以。
// 單位是 BigNumber
// 可以參考 https://docs.ethers.org/v6/migrating/#migrate-bigint
const addressBalance = await provider.getBalance(address);
const ensBalance = await provider.getBalance(ensName);
console.log('addressBalance', addressBalance.toString());
console.log('ensBalance', ensBalance.toString());
// 不過我們因該是看不懂這個數字畢竟區塊鏈的單位不太一樣。
// 記得使用單位轉換 formatEther 是真的能看懂的格式
console.log(ethers.formatEther(addressBalance));
console.log(`${ethers.parseEther('1.0').toString()} wei`);

// 可以直接比對
if (addressBalance > ethers.parseEther('0.01')) {
  console.log('大於 1 ETH');
}
// 可以數字相加
console.log(addressBalance + ethers.parseEther('1'));
// 總之如果要計算金額建議 轉換成eth的單位在做計算