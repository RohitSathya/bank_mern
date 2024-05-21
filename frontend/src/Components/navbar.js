import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
export default function navbar() {
  const navigate=useNavigate()
  return (
    <nav className="navbar">
                <div className="navbar-container">
                    <h1 className="logo">BankManagement</h1>
                    <ul className="nav-links">

                        <li><button onClick={()=>navigate('/register')}>Register</button></li>
                        <li><button onClick={() => navigate('/login')}>Logout</button></li>
                    </ul>
                </div>
            </nav>
  )
}
