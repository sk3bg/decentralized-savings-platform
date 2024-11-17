import React, { useState } from 'react';

const CheckBalance = ({ contract }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  const checkBalance = async () => {
    try {
      const balance = await contract.balanceOf(address);
      setBalance(balance.toString());
    } catch (error) {
      console.error('Failed to check balance:', error);
      alert('Failed to retrieve balance. Please try again.');
    }
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={checkBalance}>Check Balance</button>
      {balance && <p>Balance: {balance} STK</p>}
    </div>
  );
};

export default CheckBalance;
