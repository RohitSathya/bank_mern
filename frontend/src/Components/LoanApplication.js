// LoanApplicationComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoanApplicationComponent = ({data}) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [name, setname] = useState('');
  const navigate=useNavigate()

  const submitApplication = async () => {
     const ud=localStorage.getItem('userdetail')
     const parse=JSON.parse(ud)
     const res=await axios.post('http://localhost:5000/api/transaction/apply-loan',{userId:parse.accountno,loanAmount:loanAmount,durationMonths:duration,name:name,balance:data})
     const {message}=res.data
     if(message=='s'){
        toast.success('Loan Applied Successfully')
        navigate('/home')
     }
      
  };

  return (
    <>
    <ToastContainer/>
       <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 className="text-xl font-semibold mb-4">Apply for Loan</h1>
    <div className="mb-4">
      <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount:</label>
      <input type="number" id="loanAmount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
    </div>
    <div className="mb-4">
      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (Months):</label>
      <input type="number" id="duration" value={duration} onChange={e => setDuration(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
    </div>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
      <input type="text" id="name" value={name} onChange={e => setname(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
    </div>
    <button onClick={submitApplication} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Apply for Loan</button>
  </div></>
 
  );
};

export default LoanApplicationComponent;
