Week 2, Day 2: Reading and Writing to Contracts with Ethers.js


可以先領一下水龍頭，我們使用的是 ETH sepolia 測試網路
- https://www.infura.io/faucet/sepolia
- https://faucets.chain.link/

本章節我改變了一下流程，先讓大家熟悉 ethers.js 的使用，再來寫一個簡單的合約，最後再來寫一個簡單的 Dapp
當然都是取至 Becoming A Power User 一系列課程。


首先養成良好的習慣建立常用的 utils，所以我們建立一個 utils.js

## utils.js
```js
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
// 印出 JSON 格式
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

// signer 就像用你的私鑰去讓別人認識你，而 connect 是連線到網路去singer在取得資料


export { getProvder, generateWallet, getSigner }
```

先簡單的測試一下，然後我們寫一個 SendEth.js 來測試一下
## SendEth.js
```js
import 'dotenv/config';
import { ethers } from 'ethers';
import { getProvder, getSigner } from './utils.js';

const sepoliaProvider = getProvder();
const sepoliaSinger = getSigner();

const address = await sepoliaSinger.getAddress();

console.log('address', address);
// ethers v6 明確分開singiner 和 provider, singiner EIP-721
const myBalance = await sepoliaProvider.getBalance(address);

// 人看得懂的格式 ethers.formatEther
console.log('myBalance', ethers.formatEther(myBalance));
// 這裡又特別慎重的表示不要將您的 註記詞與私鑰透露。
// //const toAddress = await provider.resolveName("xxxxx.eth");
// // 傳送交易
const tx = await sepoliaSinger.sendTransaction({
  to: process.env.SEND_WALLET,
  value: ethers.parseEther('0.001'), // 這裡記得要轉換成 wei
});

console.log('send tx ', tx);
await tx.wait(); // 等待交易完成

console.log('tx complete');

```

`signer 就像用你的私鑰去讓別人認識你 （會可以交易），而 Provider 是連線到網路去singer在取得資料`


## Reading and Writing to Contracts 

最重要的部分來拉！！

這邊我先使用後續會用到的合約，所以我們先來看一下合約的部分

### YourCollectible.sol
```js
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract YourCollectible is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  string private baseURI;

  constructor() public ERC721("YourCollectible", "YCB") {
    _setBaseURI("https://ipfs.io/ipfs/");
  }

  function mintItem(address to, string memory tokenURI)
      public
      onlyOwner
      returns (uint256)
  {
      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(to, id);
      _setTokenURI(id, tokenURI);

      return id;
  }

  function _getNumItems() public view returns (uint256) {
      return _tokenIds.current();
  }
    // Set base URI
    function _setBaseURI(string memory _newBaseURI) public {
        baseURI = _newBaseURI;
    }
}

```

這是一個簡易的 ERC721 合約，我們可以透過 mintItem 來創建一個 ERC721 的 NFT，並且可以透過 _getNumItems 來取得目前的 NFT 數量。


