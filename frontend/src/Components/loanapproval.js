import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function loanapproval() {
    const [f,sf]=useState(0)
    const [loan,setloan]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        async function loanstat(){
            const ud=localStorage.getItem('userdetail')
            const parse=JSON.parse(ud)
            const res=await axios.get('http://localhost:5000/api/transaction/loan-approval')
            const {message,ls}=res.data
            if(message=='f'){
                sf(0)

            }
            else{
                setloan(ls)
                sf(1)
            }

        }
        loanstat()
    },[])
    async function reject(id){
        const res=await axios.delete(`http://localhost:5000/api/transaction/loan-reject/${id}`)
        const {message}=res.data
        if(message=='s'){
            navigate("/admindashboard")
            const ud=localStorage.getItem('userdetail')
            const parse=JSON.parse(ud)
            const res=await axios.get(`http://localhost:5000/api/transaction/loan-approval`)
            const {message}=res.data
            if(message=='s'){
               
                const ud=localStorage.getItem('userdetail')
                const parse=JSON.parse(ud)
                const res=await axios.get('http://localhost:5000/api/transaction/loan-approval')
                const {message,ls}=res.data
                if(message=='f'){
                    sf(0)
    
                }
                else{
                    setloan(ls)
                    sf(1)
                }
            }
            
        }
        
    }
    async function accept(id,amount,uid){
        console.log(id)
        const res=await axios.get(`http://localhost:5000/api/transaction/loan-approve/${id}`)
        const {message}=res.data
        if(message=='s'){
            const res2=await axios.post(`http://localhost:5000/api/transaction/deposit`,{accountno:uid,balance:amount})

            navigate("/admindashboard")
            const ud=localStorage.getItem('userdetail')
            const parse=JSON.parse(ud)
            const res=await axios.get(`http://localhost:5000/api/transaction/loan-approval`)
            const {message}=res.data
            if(message=='s'){
               
                const ud=localStorage.getItem('userdetail')
                const parse=JSON.parse(ud)
                const res=await axios.get('http://localhost:5000/api/transaction/loan-approval')
                const {message,ls}=res.data
                if(message=='f'){
                    sf(0)
    
                }
                else{
                    setloan(ls)
                    sf(1)
                }
            }
            
        }

    }
  return (
    <>
    {f==0?(<><h1>No Loan History done yet!!!</h1></>):(<> <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border-r">ID</th>
                            <th className="py-3 px-4 border-r">Name</th>
                            <th className="py-3 px-4 border-r">LoanAmount</th>
                            <th className="py-3 px-4 border-r">Month</th>
                            <th className="py-3 px-4 border-r">Balance</th>
                            <th className="py-3 px-4 border-r">Status</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {loan.map((user, index) => (
                             <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                             <td className="py-3 px-4 border-r">{index + 1}</td>
                             <td className="py-3 px-4 border-r">{user.name}</td>
                             <td className="py-3 px-4 border-r">{user.loanAmount}</td>
                             <td className="py-3 px-4 border-r">{user.durationMonths}</td>
                             <td className="py-3 px-4 border-r">{user.balance}</td>
                             <td className="py-3 px-4 border-r">
                                 <Button color='primary' onClick={()=>accept(user._id,user.loanAmount,user.userId)}>Approve</Button>
                                 <Button color='error' onClick={()=>reject(user._id)}>Reject</Button>
                             </td>
                         </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div></>)}
      
  
    </>
  )
}
