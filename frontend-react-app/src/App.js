import React, { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';  // Ethers v6 imports
import SavingsGoalForm from './components/SavingsGoalForm';
import ContributionForm from './components/ContributionForm';
import SavingsProgress from './components/SavingsProgress';
import CheckBalance from './components/CheckBalance';
import TransferTokens from './components/TransferTokens';
import MintTokens from './components/MintTokens';
import ApproveTokens from './components/ApproveTokens';
import SavingsGoalsAbi from './abis/SavingsGoals.json';  // ABI of the deployed contract
import './App.css';  // Include custom CSS for styling

const App = () => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');  // Track connected account

  // Contract address (after deployment)
  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';  // Replace with your deployed contract address

  // Connect to MetaMask and initialize contract
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);  // Use BrowserProvider in ethers v6
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const accountAddress = await signer.getAddress();  // Get connected account address

        setProvider(provider);
        setSigner(signer);
        setAccount(accountAddress);  // Set the account

        // Initialize contract
        const contract = new Contract(contractAddress, SavingsGoalsAbi.abi, signer);
        setContract(contract);

        console.log('Connected to MetaMask with address:', accountAddress);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect to MetaMask.');
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };

  // Automatically check for MetaMask and connect if available
  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            connectWallet();  // Automatically connect if an account is already available
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
        }
      } else {
        alert('MetaMask not detected. Please install MetaMask to use this DApp.');
      }
    };

    checkMetaMaskConnection();
  }, []);  // Empty dependency array to run once on component mount

  return (
    <div className="App">
      <h1>Decentralized Savings Platform</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
        </div>
      )}
      {contract && (
        <div className="container">
          <div className="left-section">
            {contract && (
              <>
                <SavingsGoalForm contract={contract} account={account} />
                <ContributionForm contract={contract} account={account} />
                <SavingsProgress contract={contract} account={account} />
              </>
            )}
          </div>

          <div className="right-section">
            {contract && (
              <>
                <CheckBalance contract={contract} />
                <TransferTokens contract={contract} account={account} />
                <MintTokens contract={contract} account={account} />
                <ApproveTokens contract={contract} account={account} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
