import React, { useState } from 'react';

const LoanEMICalculatorComponent = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [durationMonths, setDurationMonths] = useState('');
  const [emi, setEMI] = useState('');

  const calculateEMI = () => {
    const loanAmountValue = parseFloat(loanAmount);
    const interestRateValue = parseFloat(interestRate) / 100 / 12;
    const durationMonthsValue = parseFloat(durationMonths);

    const emiValue = calculateEMIHelper(loanAmountValue, interestRateValue, durationMonthsValue);
    setEMI(emiValue.toFixed(2));
  }

  const calculateEMIHelper = (loanAmount, interestRate, durationMonths) => {
    const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, durationMonths)) / (Math.pow(1 + interestRate, durationMonths) - 1);
    return emi;
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Loan EMI Calculator</h1>
      <div className="mb-4">
        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount:</label>
        <input type="number" id="loanAmount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
      </div>
      <div className="mb-4">
        <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Interest Rate (%):</label>
        <input type="number" id="interestRate" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
      </div>
      <div className="mb-4">
        <label htmlFor="durationMonths" className="block text-sm font-medium text-gray-700">Duration (Months):</label>
        <input type="number" id="durationMonths" value={durationMonths} onChange={e => setDurationMonths(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
      </div>
      <button onClick={calculateEMI} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Calculate EMI</button>
      <div className="mt-4">EMI: ${emi}</div>
    </div>
  );
};

export default LoanEMICalculatorComponent;
