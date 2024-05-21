import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/home'
import Register from './Components/register'
import Login from './Components/login'
import Profile from './Components/profile'
import Admindashboard from './Components/admindashboard'
import AllUsers from './Components/AllUsers'
import Deposit from './Components/deposit'
import Withdrawal from './Components/withdrawal'
import Customers from './Components/customers'
import Transaction from './Components/transaction'
import Selection from './Components/selection'
import CustomersA from './Components/customersA'
import TransactionHistory from './Components/TransactionHistory'
import LoanEmi from './Components/LoanEmi'
import LoanApplication from './Components/LoanApplication'
import Loanstatus from './Components/loanstatus'
import Loanapproval from './Components/loanapproval'
import ChatUsers from './Components/ChatUsers'
import ATransactionhistory from './Components/ATransactionhistory'
import { useState } from 'react'

function App() {
  const [cusname,setcusname]=useState()
  const [cusno,setcusno]=useState()
  const [balance,setbalance]=useState()
  const [th,sth]=useState()
  function getdetail(a,b){
     setcusname(a)
     setcusno(b)

  }
  function gb(e){
    setbalance(e)

  }
  function ath(e){
    sth(e)

  }
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Selection/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home func={gb}/>} ></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/transactionhistory' element={<TransactionHistory/>}></Route>
      <Route path='/loanemi' element={<LoanEmi/>}></Route>
      <Route path='/loanapplication' element={<LoanApplication data={balance}/>}></Route>
      <Route path='/loanstatus' element={<Loanstatus/>}></Route>
      <Route path='/Atransactionhistory' element={<ATransactionhistory data={th}/>}></Route>
      <Route path='/admindashboard' element={<Admindashboard/>}></Route>
      <Route path='/chatuser' element={<ChatUsers/>}></Route>

      <Route path='/admindashboard/allusers' element={<AllUsers/>}></Route>
      <Route path='/loanapproval' element={<Loanapproval/>}></Route>
      <Route path='/customer' element={<Customers func={getdetail}/>}></Route>
      <Route path='/customerA' element={<CustomersA func={getdetail} func2={ath}/>}></Route>
      <Route path='/transaction' element={<Transaction data1={cusname} data2={cusno}/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
