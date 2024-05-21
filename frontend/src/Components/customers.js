import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function customers({func}) {
    const[customers,setcustomers]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        async function getuser(){
            const ud=localStorage.getItem('userdetail')
            const parse=JSON.parse(ud)
            const res=await axios.get(`http://localhost:5000/api/auth/Egetuser/${parse.accountno}`)
            setcustomers(res.data)
        }
        getuser()
    },[])
  return (
    <>
       <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 border-r">ID</th>
                            <th className="py-3 px-4 border-r">Name</th>
                            <th className="py-3 px-4 border-r">Account No</th>
                            <th className="py-3 px-4 border-r">Other Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-3 px-4 border-r">{index + 1}</td>
                                <td className="py-3 px-4 border-r">{user.username}</td>
                                <td className="py-3 px-4 border-r">{user.accountno}</td>
                                <td className="py-3 px-4 border-r cursor-pointer" onClick={()=>{func(user.username,user.accountno);navigate('/transaction')}}>Transfer Money</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  
    </>
  )
}
