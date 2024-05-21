import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function transaction({data1,data2}) {
    const [amount,setamount]=useState()
   const [bal,setBalance]=useState()
    const navigate=useNavigate()

    useEffect(()=>{

        async function getbal(){
            const userDetail = localStorage.getItem('userdetail');
            const parse = JSON.parse(userDetail);
            const response = await axios.get(`http://localhost:5000/api/transaction/balance/${parse.accountno}`);
            const { balance } = response.data;
            setBalance(balance);
        }
        getbal()

     },[])

    async function transfer(){
        if(amount>bal){
            toast.error('Insufficient balance')
        }
        else{
            const ud=localStorage.getItem('userdetail')
        const parse=JSON.parse(ud)
        const response=await axios.post('http://localhost:5000/api/transaction/transfer',{type:'transfer',fromaccountno:parse.accountno,toaccountno:data2,amount:amount})
        const {message}=response.data
        if(message=='s'){
            toast.success('Transaction Completed succesfully')
            navigate('/home')
        }

        }
        


    }
    
  return (
    <>
    <ToastContainer/>
           <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2">{data1}</h2>
                <h2 className="text-xl font-bold mb-2">{data2}</h2>
                <h2 className="text-xl font-bold mb-2">Your balance:{bal}</h2>
                <input
                    type="text"
                    placeholder="Enter amount to send"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                    className="w-full bg-gray-200 rounded-md py-2 px-4 mt-2 focus:outline-none"
                />
            </div>
            <div className="px-6 py-4 flex justify-between">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={transfer}>
                    Transfer Money
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/customer')}>
                    Cancel Transaction
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/home')}>
                    Back to Homepage
                </button>
            </div>
        </div>

    </>
  )
}
