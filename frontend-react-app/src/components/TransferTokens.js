import React, { useState } from 'react';
import { parseUnits } from 'ethers';

const TransferTokens = ({ contract, account }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const transferTokens = async () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const tx = await contract.transfer(recipient, parseUnits(amount, 'ether'));
      await tx.wait();
      setTxHash(tx.hash);
      alert(`Tokens transferred! Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error('Failed to transfer tokens:', error);
      alert('Failed to transfer tokens. Please try again.');
    }
  };

  return (
    <div>
      <h2>Transfer Tokens</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={transferTokens}>Transfer Tokens</button>
      {txHash && <p>Transaction Hash: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>}
    </div>
  );
};

export default TransferTokens;
