import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';
import { CiChat2 } from 'react-icons/ci';
import Naavbar from './navbar';
import { useRef } from 'react';
import io from 'socket.io-client'

export default function Home({ func }) {
   
        const socket=io.connect('http://localhost:5000')

    
  



 
   
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [tab, setTab] = useState('deposit');
    const [accountno, setAccountNo] = useState('');
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState();
    const [accounttype, setAccountType] = useState('');
    const [showChat, setShowChat] = useState(false); // State to control chatbox visibility
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const messagecontainerRef=useRef(null)
    const [inputMessage, setInputMessage] = useState('');
    const inputMessageRef = useRef(null);
    const [to,sto]=useState()
    const [f,sf]=useState(0)
    const [messages,setmessages]=useState([])
    const [uid,suid]=useState('')

    useEffect(()=>{
        function fetchid(){
             const ud=localStorage.getItem('userdetail')
             const parse=JSON.parse(ud)
             suid(parse._id)
        }
        fetchid()
    },[])

    useEffect(() => {
        async function g() {
            const a = document.getElementById('bal');
            const userDetail = localStorage.getItem('userdetail');
            const parse = JSON.parse(userDetail);
            const response = await axios.get(`http://localhost:5000/api/transaction/balance/${parse._id}`);
            const { balance } = response.data;
            setBalance(balance);
            a.style.display = 'block';
        }
        g();
    }, []);

    useEffect(() => {
        function checkUser() {
            const token = localStorage.getItem('token');
            if (!token || token === '') {
                navigate('/login');
            } else {
                const userDetail = localStorage.getItem('userdetail');
                const parse = JSON.parse(userDetail);
                setName(parse.username);
                setAccountType(parse.type);
            }
        }
        checkUser();
    }, [navigate]);

    const handleTabChange = (selectedTab) => {
        setTab(selectedTab);
    };

    const handleDeposit = async (action) => {
        const ud=localStorage.getItem('userdetail')
        const parse=JSON.parse(ud)
        if (action === 'deposit') {
            const am = Number(amount);
            
            const res1=await axios.post('http://localhost:5000/api/transaction/deposit',{accountno:parse.accountno,balance:am})
            const {bal}=res1.data
            setBalance(bal);
            toast.success('Deposited successfully');
        } else if (action === 'withdrawal') {
            if (balance === 0) {
                toast.error('Insufficient balance');
            } else {
                const am2 = Number(amount);
                const res2=await axios.post('http://localhost:5000/api/transaction/withdraw',{accountno:parse.accountno,balance:am2})
            const {bal}=res2.data
            setBalance(bal);
            toast.success('Deposited successfully');
            }
        }
    };

    const handleChatClick = () => {
        setShowChat(!showChat); // Toggle chatbox visibility
    };

    const handleMessageSend = async() => {
        if (message.trim() !== '') {
          const ud=localStorage.getItem('userdetail')
          const parse=JSON.parse(ud)
          const res=await axios.post('http://localhost:5000/api/chat/sendmsg',{userId:parse._id,message:message,to:'Admin'})
          const {m}=res.data
          if(m=='s'){
            setMessage('')
            toast.success('Message sent succesfully')
          }




        }
        else{
            toast.warn('Message cant be empty')
        }
    };

    async function getbalance() {
        const a = document.getElementById('bal');
        const userDetail = localStorage.getItem('userdetail');
        const parse = JSON.parse(userDetail);
        const response = await axios.get(`http://localhost:5000/api/transaction/balance/${parse.accountno}`);
        const { balance } = response.data;
        setBalance(balance);
        a.style.display = 'block';
    }
    const renderForm = () => {
        return (

        
            <div className="form-container">
      
                <div className="tab-switches">
                    <button 
                        className={`tab-button ${tab === 'withdrawal' ? 'active' : ''}`} 
                        onClick={() => handleTabChange('withdrawal')}
                    >
                        Withdraw
                    </button>
                    <button 
                        className={`tab-button ${tab === 'deposit' ? 'active' : ''}`} 
                        onClick={() => handleTabChange('deposit')}
                    >
                        Deposit
                    </button>
                </div>
                <form>
                    
                    <div className="form-group">
                        <label className="text-green-600">Amount</label>
                        <input 
                            type="text" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            className="input-field"  style={{background:'whitesmoke'}}
                        />
                    </div>
                    <button 
                        type="button" 
                        onClick={() => handleDeposit(tab)} // Pass the tab value as action
                        className="submit-button"
                    >
                        {tab === 'withdrawal' ? 'Withdraw' : 'Deposit'}
                    </button>
                </form>
            </div>
        );
    };
    useEffect(()=>{
        if (messagecontainerRef.current) {
          messagecontainerRef.current.scrollTop = messagecontainerRef.current.scrollHeight;
        }
    
       },[messages])
       async function viewchat(e){
        sto(e)
        console.log(e)
        const m1=document.getElementById('m1');
        m1.style.display='block'
         const res=await axios.get(`http://localhost:5000/api/chat/getmsgU/${e}`)
         const {m}=res.data
         if(m=='f'){
            sf(0)
            setmessages([])
         }
         else{
            setmessages(res.data)

         }
      

       }
       async function sendMessage(){
        if (inputMessage.trim() === '') {
            toast.warn('Please enter a message');
            return;
        }
    
        const res=await axios.post('http://localhost:5000/api/chat/sendmsg',{userId:uid,message:inputMessage,to:'Admin'})
        const {m}=res.data
        if(m=='s'){
            
            
            console.log(socket)
            
        setInputMessage(''); 
        inputMessageRef.current.focus(); 
        const res2=await axios.get(`http://localhost:5000/api/chat/getmsgU/${uid}`)
        setmessages(res2.data)
      
     
    
        }
    
        
     }
    return (
        <>
            <ToastContainer />
            <Naavbar />
            <div className="chat-icon-container">
                <CiChat2 style={{ marginLeft: '200px', fontSize: '2em', cursor: 'pointer' }} onClick={()=>viewchat(uid)} />
                <h2 style={{ marginLeft: '240px', marginTop: '-30px', cursor: 'pointer' }}>
                    Chat With Support
                </h2>
            </div>
            {showChat && ( // Render chatbox if showChat is true
                <div className="chatbox-container">
                    <div className="chatbox">
                        <div className="chatbox-header">
                            <h3>Support</h3>
                            <button className="close-button" onClick={handleChatClick}>Close</button>
                        </div>
                        <div className="chatbox-messages">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chatbox-input">
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
                            <button onClick={handleMessageSend}>Send</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="home-container">
                <h1>Account Type: {accounttype}</h1>
                <h1>Welcome {name}</h1>
                <button onClick={() => navigate('/customer')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Transfer Money
                </button><br/><br/>
                <button onClick={getbalance} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Check balance
                </button><br/><br/>
                <button onClick={() => navigate('/transactionhistory')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Transaction History
                </button><br/><br/>
                <button onClick={() => navigate('/loanemi')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    EMI Calculator
                </button><br/><br/>
                <button onClick={() => {func(balance); navigate('/loanapplication');}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Loan Application
                </button><br/><br/>
                <button onClick={() => navigate('/loanstatus')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Loan Status
                </button><br/><br/>
                <h2 style={{ display: 'none' }} id="bal">
                    Your balance: {balance}
                </h2>
            </div>
            {renderForm()}
            <div className='message-container'  id='m1' ref={messagecontainerRef}>
                <button  className="bg-red-500 text-white py-2 px-4 ml-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={()=>{const m1=document.getElementById('m1');
        m1.style.display='none'}}>X</button>
     
     {
       messages.map((m)=>{
          return(
             <div>
                <div className={`message${m.fromSelf  ? "sended":"recieved"}`} >
                   <div className={`content${m.fromSelf  ? "sended":"recieved"}`}>
                     <b style={{paddingLeft:'16px'}} >{m.message} </b>
                   </div>
                </div>
             </div>
          )
     })
   }
    <div className="flex justify-between items-center px-4 py-2 bg-gray-200 fixed bottom-0 left-0 right-0">
                <input 
                    type="text" 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                    ref={inputMessageRef}
                />
                <button 
                    onClick={sendMessage} 
                    className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Send
                </button>
            </div>


   </div>
         
         
        </>
    );
}
