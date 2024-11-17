import React, { useState } from 'react';

const SavingsProgress = ({ contract }) => {
  const [goalId, setGoalId] = useState('');
  const [progress, setProgress] = useState(null);  // Store progress details

  const getSavingsProgress = async () => {
    if (!goalId || !contract) {
      alert('Please provide a valid goal ID.');
      return;
    }

    try {
      // Get progress of the savings goal
      const [targetAmount, balance, deadline, id] = await contract.getProgress(goalId);
      alert("balance: "+ balance);
      setProgress({
        targetAmount: targetAmount.toString(),
        balance: balance.toString(),
        deadline: new Date(Number(deadline) * 1000).toLocaleString(),  // Convert to readable format
        id: id.toString(),
      });
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      alert('Failed to retrieve goal progress. Please try again.');
    }
  };

  return (
    <div>
      <h2>Check Savings Progress</h2>
      <input
        type="number"
        placeholder="Goal ID"
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
      />
      <button onClick={getSavingsProgress}>Get Progress</button>

      {progress && (
        <div>
          <p><strong>Goal ID:</strong> {progress.id}</p>
          <p><strong>Target Amount:</strong> {progress.targetAmount} Wei</p>
          <p><strong>Current Balance:</strong> {progress.balance} Wei</p>
          <p><strong>Deadline:</strong> {progress.deadline}</p>
        </div>
      )}
    </div>
  );
};

export default SavingsProgress;
