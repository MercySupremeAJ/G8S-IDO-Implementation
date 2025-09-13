const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("G8SToken", function () {
  let g8sToken;
  let owner;
  let treasury;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, treasury, addr1, addr2] = await ethers.getSigners();
    
    const G8SToken = await ethers.getContractFactory("G8SToken");
    g8sToken = await G8SToken.deploy(treasury.address);
    await g8sToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name", async function () {
      expect(await g8sToken.name()).to.equal("G8S Token");
    });

    it("Should set the correct symbol", async function () {
      expect(await g8sToken.symbol()).to.equal("G8S");
    });

    it("Should set the correct decimals", async function () {
      expect(await g8sToken.decimals()).to.equal(18);
    });

    it("Should set the correct total supply", async function () {
      const expectedSupply = ethers.parseEther("1000000"); // 1M tokens
      expect(await g8sToken.totalSupply()).to.equal(expectedSupply);
    });

    it("Should set the correct treasury", async function () {
      expect(await g8sToken.treasury()).to.equal(treasury.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await g8sToken.balanceOf(owner.address);
      expect(await g8sToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await g8sToken.transfer(addr1.address, transferAmount);
      expect(await g8sToken.balanceOf(addr1.address)).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const transferAmount = ethers.parseEther("1000001"); // More than total supply
      
      await expect(
        g8sToken.transfer(addr1.address, transferAmount)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should emit Transfer event", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await expect(g8sToken.transfer(addr1.address, transferAmount))
        .to.emit(g8sToken, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });
  });

  describe("Approvals", function () {
    it("Should approve tokens for spender", async function () {
      const approveAmount = ethers.parseEther("1000");
      
      await g8sToken.approve(addr1.address, approveAmount);
      expect(await g8sToken.allowance(owner.address, addr1.address)).to.equal(approveAmount);
    });

    it("Should emit Approval event", async function () {
      const approveAmount = ethers.parseEther("1000");
      
      await expect(g8sToken.approve(addr1.address, approveAmount))
        .to.emit(g8sToken, "Approval")
        .withArgs(owner.address, addr1.address, approveAmount);
    });
  });

  describe("Transfer From", function () {
    it("Should transfer tokens on behalf of another account", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await g8sToken.approve(addr1.address, transferAmount);
      await g8sToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
      
      expect(await g8sToken.balanceOf(addr2.address)).to.equal(transferAmount);
      expect(await g8sToken.allowance(owner.address, addr1.address)).to.equal(0);
    });

    it("Should fail if allowance is insufficient", async function () {
      const transferAmount = ethers.parseEther("1000");
      
      await g8sToken.approve(addr1.address, transferAmount / 2n);
      
      await expect(
        g8sToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount)
      ).to.be.revertedWith("Insufficient allowance");
    });
  });
});
