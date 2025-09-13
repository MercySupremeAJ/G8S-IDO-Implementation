const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IDOContract", function () {
  let g8sToken;
  let idoContract;
  let owner;
  let treasury;
  let buyer1;
  let buyer2;

  beforeEach(async function () {
    [owner, treasury, buyer1, buyer2] = await ethers.getSigners();
    
    // Deploy G8S Token
    const G8SToken = await ethers.getContractFactory("G8SToken");
    g8sToken = await G8SToken.deploy(treasury.address);
    await g8sToken.waitForDeployment();

    // Deploy IDO Contract
    const tokenPrice = ethers.parseEther("0.000001"); // 0.000001 ETH per token
    const IDOContract = await ethers.getContractFactory("IDOContract");
    idoContract = await IDOContract.deploy(
      await g8sToken.getAddress(),
      tokenPrice,
      treasury.address
    );
    await idoContract.waitForDeployment();

    // Transfer tokens to IDO contract for sale
    const tokensForSale = ethers.parseEther("100000"); // 100K tokens
    await g8sToken.transfer(await idoContract.getAddress(), tokensForSale);
  });

  describe("Deployment", function () {
    it("Should set the correct token address", async function () {
      expect(await idoContract.token()).to.equal(await g8sToken.getAddress());
    });

    it("Should set the correct price", async function () {
      const expectedPrice = ethers.parseEther("0.000001");
      expect(await idoContract.price()).to.equal(expectedPrice);
    });

    it("Should set the correct treasury", async function () {
      expect(await idoContract.treasury()).to.equal(treasury.address);
    });

    it("Should set the correct owner", async function () {
      expect(await idoContract.owner()).to.equal(owner.address);
    });

    it("Should initialize tokens sold to 0", async function () {
      expect(await idoContract.tokensSold()).to.equal(0);
    });
  });

  describe("Token Purchase", function () {
    it("Should allow users to buy tokens", async function () {
      const ethAmount = ethers.parseEther("1"); // 1 ETH
      const expectedTokens = ethAmount / ethers.parseEther("0.000001"); // 1M tokens
      
      const treasuryBalanceBefore = await ethers.provider.getBalance(treasury.address);
      
      await idoContract.connect(buyer1).buy({ value: ethAmount });
      
      expect(await g8sToken.balanceOf(buyer1.address)).to.equal(expectedTokens);
      expect(await idoContract.tokensSold()).to.equal(expectedTokens);
      
      const treasuryBalanceAfter = await ethers.provider.getBalance(treasury.address);
      expect(treasuryBalanceAfter - treasuryBalanceBefore).to.equal(ethAmount);
    });

    it("Should emit TokensPurchased event", async function () {
      const ethAmount = ethers.parseEther("1");
      const expectedTokens = ethAmount / ethers.parseEther("0.000001");
      
      await expect(idoContract.connect(buyer1).buy({ value: ethAmount }))
        .to.emit(idoContract, "TokensPurchased")
        .withArgs(buyer1.address, ethAmount, expectedTokens);
    });

    it("Should fail if no ETH is sent", async function () {
      await expect(
        idoContract.connect(buyer1).buy({ value: 0 })
      ).to.be.revertedWith("Must send ETH to buy tokens");
    });

    it("Should fail if not enough tokens available", async function () {
      // Try to buy more tokens than available
      const ethAmount = ethers.parseEther("200"); // Would require 200M tokens
      
      await expect(
        idoContract.connect(buyer1).buy({ value: ethAmount })
      ).to.be.revertedWith("Not enough tokens available");
    });
  });

  describe("Owner Functions", function () {
    it("Should allow owner to set new price", async function () {
      const newPrice = ethers.parseEther("0.000002");
      
      await idoContract.setPrice(newPrice);
      expect(await idoContract.price()).to.equal(newPrice);
    });

    it("Should not allow non-owner to set price", async function () {
      const newPrice = ethers.parseEther("0.000002");
      
      await expect(
        idoContract.connect(buyer1).setPrice(newPrice)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should allow owner to withdraw unsold tokens", async function () {
      // Buy some tokens first
      await idoContract.connect(buyer1).buy({ value: ethers.parseEther("1") });
      
      const unsoldTokens = await g8sToken.balanceOf(await idoContract.getAddress());
      const ownerBalanceBefore = await g8sToken.balanceOf(owner.address);
      
      await idoContract.withdrawUnsold();
      
      expect(await g8sToken.balanceOf(owner.address)).to.equal(ownerBalanceBefore + unsoldTokens);
      expect(await g8sToken.balanceOf(await idoContract.getAddress())).to.equal(0);
    });

    it("Should not allow non-owner to withdraw unsold tokens", async function () {
      await expect(
        idoContract.connect(buyer1).withdrawUnsold()
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Multiple Purchases", function () {
    it("Should handle multiple buyers", async function () {
      const ethAmount1 = ethers.parseEther("1");
      const ethAmount2 = ethers.parseEther("2");
      const expectedTokens1 = ethAmount1 / ethers.parseEther("0.000001");
      const expectedTokens2 = ethAmount2 / ethers.parseEther("0.000001");
      
      await idoContract.connect(buyer1).buy({ value: ethAmount1 });
      await idoContract.connect(buyer2).buy({ value: ethAmount2 });
      
      expect(await g8sToken.balanceOf(buyer1.address)).to.equal(expectedTokens1);
      expect(await g8sToken.balanceOf(buyer2.address)).to.equal(expectedTokens2);
      expect(await idoContract.tokensSold()).to.equal(expectedTokens1 + expectedTokens2);
    });
  });
});
