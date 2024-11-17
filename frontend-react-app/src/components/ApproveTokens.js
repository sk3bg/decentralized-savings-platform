import React, { useState } from 'react';
import { parseUnits } from 'ethers';

const ApproveTokens = ({ contract, account }) => {
  const [spender, setSpender] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const approveTokens = async () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const tx = await contract.approve(spender, parseUnits(amount, 'ether'));
      await tx.wait();
      setTxHash(tx.hash);
      alert(`Tokens approved! Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error('Failed to approve tokens:', error);
      alert('Approval failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Approve Tokens</h2>
      <input
        type="text"
        placeholder="Spender Address"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount to Approve"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={approveTokens}>Approve Tokens</button>
      {txHash && <p>Transaction Hash: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>}
    </div>
  );
};

export default ApproveTokens;
