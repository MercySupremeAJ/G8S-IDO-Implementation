// Deployment script for G8S IDO contracts
// Run with: npx hardhat run scripts/deploy.js --network sepolia

const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying G8S IDO Contracts...");

  // Get the contract factories
  const G8SToken = await ethers.getContractFactory("G8SToken");
  const IDOContract = await ethers.getContractFactory("IDOContract");

  // Treasury address (you can change this)
  const treasuryAddress = "0x3F9F3Ef80CC1A53ba77a00B5ee66262ED2FEa72D";
  
  // Token price: 0.000001 ETH per token (in wei)
  const tokenPrice = ethers.parseEther("0.000001");

  console.log("Deploying G8S Token...");
  const token = await G8SToken.deploy(treasuryAddress);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("G8S Token deployed to:", tokenAddress);

  console.log("Deploying IDO Contract...");
  const ido = await IDOContract.deploy(tokenAddress, tokenPrice, treasuryAddress);
  await ido.waitForDeployment();
  const idoAddress = await ido.getAddress();
  console.log("IDO Contract deployed to:", idoAddress);

  console.log("\n=== Deployment Summary ===");
  console.log("G8S Token:", tokenAddress);
  console.log("IDO Contract:", idoAddress);
  console.log("Treasury:", treasuryAddress);
  console.log("Token Price:", ethers.formatEther(tokenPrice), "ETH");

  // Verify contracts (optional)
  console.log("\nVerifying contracts...");
  try {
    await hre.run("verify:verify", {
      address: tokenAddress,
      constructorArguments: [treasuryAddress],
    });
    console.log("G8S Token verified");
  } catch (error) {
    console.log("G8S Token verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: idoAddress,
      constructorArguments: [tokenAddress, tokenPrice, treasuryAddress],
    });
    console.log("IDO Contract verified");
  } catch (error) {
    console.log("IDO Contract verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
