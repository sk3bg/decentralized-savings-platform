const hre = require("hardhat");

async function main() {
    // Set the initial supply for the ERC-20 token (e.g., 1,000,000 tokens with 18 decimals)
    const initialSupply = hre.ethers.parseUnits("1000000", 18); // 1,000,000 tokens

    // Get the contract factory for the SavingsGoals contract
    const SavingsGoals = await hre.ethers.getContractFactory("SavingsGoals");

    // Deploy the contract with the initial supply as the constructor parameter
    const savingsGoals = await SavingsGoals.deploy(initialSupply);

    // Wait for the deployment to be mined
    await savingsGoals.waitForDeployment(); // ethers.js v6 method

    console.log("SavingsGoals deployed to:", savingsGoals.target); // ethers.js v6 uses 'target'
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
