import React, { useState } from 'react';
import { parseUnits } from 'ethers';  // Direct import of parseUnits

const ContributionForm = ({ contract, account }) => {
  const [goalId, setGoalId] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [txHash, setTxHash] = useState('');  // Store the transaction hash

  const contributeToGoal = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!goalId || !contributionAmount || contributionAmount <= 0) {
      alert("Please enter valid goal ID and contribution amount.");
      return;
    }

    if (contract) {
      try {
        // Debug: Log the inputs to ensure they are correct
        console.log("Goal ID:", goalId);
        console.log("Contribution Amount in Ether:", contributionAmount);
        console.log("Parsed Amount (in Wei):", parseUnits(contributionAmount, 'ether').toString());

        // Send the transaction
        const tx = await contract.contribute(goalId, { value: parseUnits(contributionAmount, 'ether') });
        await tx.wait();
        setTxHash(tx.hash);  // Store the transaction hash
        alert(`Contribution successful! Transaction Hash: ${tx.hash}`);
      } catch (error) {
        console.error("Contribution failed:", error);
        alert("Failed to contribute. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Contribute to Savings Goal</h2>
      <input
        type="number"
        placeholder="Goal ID"
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount in Ether"
        value={contributionAmount}
        onChange={(e) => setContributionAmount(e.target.value)}
      />
      <button onClick={contributeToGoal}>Contribute</button>

      {txHash && (
        <div>
          <p>Transaction Hash: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>
        </div>
      )}
    </div>
  );
};

export default ContributionForm;
