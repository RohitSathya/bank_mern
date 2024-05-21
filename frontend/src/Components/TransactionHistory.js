import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function TransactionHistory() {
    const[transaction,settransaction]=useState([])
    const navigate=useNavigate()
    const [f,sf]=useState(0)

    useEffect(()=>{
        async function gethistory(){
            const ud=localStorage.getItem('userdetail')
            const parse=JSON.parse(ud)
            const res=await axios.get(`http://localhost:5000/api/transaction/gettransactionbyid/${parse.accountno}`)
            const {message,th}=res.data
            if(message=='f'){
                sf(0)
            }
            else{
                settransaction(th)
                sf(1)
            }
           
        }
        gethistory()
    },[])
  return (
    <>
    {f==0?(<><h1>No Transaction History done yet!!!</h1></>):(<> <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border-r">ID</th>
                            <th className="py-3 px-4 border-r">From</th>
                            <th className="py-3 px-4 border-r">To</th>
                            <th className="py-3 px-4 border-r">Type</th>
                            <th className="py-3 px-4 border-r">Amount</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {transaction.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-3 px-4 border-r">{index + 1}</td>
                                <td className="py-3 px-4 border-r">{user.fromaccountno}</td>
                                <td className="py-3 px-4 border-r">{user.toaccountno}</td>
                                <td className="py-3 px-4 border-r">{user.type}</td>
                                <td className="py-3 px-4 border-r">{user.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div></>)}
      
  
    </>
  )
}
