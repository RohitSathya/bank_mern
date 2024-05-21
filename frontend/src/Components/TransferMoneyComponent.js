// TransferMoneyComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TransferMoneyComponent = () => {
  const [sourceCategory, setSourceCategory] = useState('');
  const [destinationCategory, setDestinationCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    try {
      const response = await axios.post('/transfer', {
        sourceCategory,
        destinationCategory,
        amount
      });
      console.log(response.data); // Handle success or display error message
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <div>
      <select value={sourceCategory} onChange={e => setSourceCategory(e.target.value)}>
        {/* Dropdown options for source categories */}
      </select>
      <select value={destinationCategory} onChange={e => setDestinationCategory(e.target.value)}>
        {/* Dropdown options for destination categories */}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransferMoneyComponent;
