import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function customersA({func,func2}) {
    const[customers,setcustomers]=useState([])
    const navigate=useNavigate()
   const [f,sf]=useState(0)
    useEffect(()=>{
        async function getuser(){
           
            const res=await axios.get(`http://localhost:5000/api/admin/getuser`)
            const {message,ud}=res.data
            if(message=='f'){
                sf(0)
            }
            else{

                setcustomers(ud)
                sf(1)


            }
          
        }
        getuser()
    },[])
  return (
    <>
    {f==0?(<><h1>No customer yet</h1></>):(<><div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border-r">ID</th>
                            <th className="py-3 px-4 border-r">Name</th>
                            <th className="py-3 px-4 border-r">Account No</th>
                            <th className="py-3 px-4 border-r">TransactionHistory</th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-3 px-4 border-r">{index + 1}</td>
                                <td className="py-3 px-4 border-r">{user.username}</td>
                                <td className="py-3 px-4 border-r" style={{cursor:'pointer'}}>{user.accountno}</td>
                                <td className="py-3 px-4 border-r" style={{cursor:'pointer'}} onClick={()=>{func2(user.accountno);navigate('/Atransactionhistory')}}>Click to see TransactionHistory</td>
                                
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  </>)}
       
    </>
  )
}
