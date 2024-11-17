import React, { useState } from 'react';
import { parseUnits } from 'ethers';

const MintTokens = ({ contract, account }) => {
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const mintTokens = async () => {
    try {
      const tx = await contract.mint(account, parseUnits(amount, 'ether'));
      await tx.wait();
      setTxHash(tx.hash);
      alert(`Tokens minted! Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error('Failed to mint tokens:', error);
      alert('Minting failed. Only the contract owner can mint tokens.');
    }
  };

  return (
    <div>
      <h2>Mint Tokens</h2>
      <input
        type="number"
        placeholder="Amount to Mint"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={mintTokens}>Mint Tokens</button>
      {txHash && <p>Transaction Hash: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>}
    </div>
  );
};

export default MintTokens;
