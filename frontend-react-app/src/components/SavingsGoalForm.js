import React, { useState } from 'react';
import { parseUnits } from 'ethers';  // Directly import parseUnits

const SavingsGoalForm = ({ contract, account }) => {
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [txHash, setTxHash] = useState('');  // Store the transaction hash

  const createSavingsGoal = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    // Convert date to Unix timestamp (seconds since 1970)
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

    if (!targetAmount || !deadline || targetAmount <= 0 || deadlineTimestamp <= Date.now() / 1000) {
      alert("Please provide a valid target amount and future deadline.");
      return;
    }

    if (contract) {
      try {
        // Debugging: Log the inputs to ensure they are correct
      console.log("Target Amount in Ether:", targetAmount);
      console.log("Parsed Target Amount (in Wei):", parseUnits(targetAmount, 'ether').toString());
      console.log("Deadline (Timestamp in seconds):", deadlineTimestamp);

        // Send the transaction to create a savings goal
        const tx = await contract.createSavingsGoal(parseUnits(targetAmount, 'ether'), deadlineTimestamp);
        await tx.wait();
        setTxHash(tx.hash);  // Store the transaction hash
        alert(`Savings goal created! Transaction Hash: ${tx.hash}`);
      } catch (error) {
        console.error("Failed to create savings goal:", error);
        alert("Failed to create goal. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Create Savings Goal</h2>
      <input
        type="number"
        placeholder="Target Amount in Ether"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={createSavingsGoal}>Create Goal</button>

      {txHash && (
        <div>
          <p>Transaction Hash: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>
        </div>
      )}
    </div>
  );
};

export default SavingsGoalForm;
