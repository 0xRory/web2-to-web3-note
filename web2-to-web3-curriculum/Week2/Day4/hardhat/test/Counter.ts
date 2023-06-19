
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

describe("Counter", function () {
  let myContract: Contract;
  let owner: Signer;
  let signer1: Signer;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    myContract = await Counter.deploy(10);
    await myContract.deployed();
    console.log('myContract', myContract.address);
    [owner, signer1] = await ethers.getSigners();
  });

  it("inc number", async function () {
    expect(await myContract.get()).to.equal(10);
    const incTx = await myContract.inc();
    await incTx.wait();

    expect(await myContract.get()).to.equal(11);

    expect(await myContract.boss()).to.equal(await owner.getAddress());
  });

  it("test dec owner", async function () {
    //await myContract.connect(signer1).dec()
    await myContract.dec()
  });

});