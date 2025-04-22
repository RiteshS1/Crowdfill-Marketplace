const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TestToken first
  const TestToken = await hre.ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy();
  await testToken.waitForDeployment();
  console.log("TestToken deployed to:", await testToken.getAddress());

  // Deploy Crowdfill marketplace with deployer as fee collector
  const Crowdfill = await hre.ethers.getContractFactory("Crowdfill");
  const crowdfill = await Crowdfill.deploy(deployer.address);
  await crowdfill.waitForDeployment();
  console.log("Crowdfill deployed to:", await crowdfill.getAddress());

  // Verify contracts on Etherscan
  console.log("Waiting for block confirmations...");
  await crowdfill.deploymentTransaction().wait(6); // Wait for 6 block confirmations

  console.log("Verifying contracts on Etherscan...");
  await hre.run("verify:verify", {
    address: await testToken.getAddress(),
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: await crowdfill.getAddress(),
    constructorArguments: [deployer.address],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 