const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const Authroute=require('./router/AuthRoute')
const AdminRoute=require('./router/AdminRoute')
const TransactionRoute=require('./router/TransactionRoute')
const chatRoute=require('./router/ChatRoute')
app.use(cors({
  origin: 'https://bank-front-eight.vercel.app',
}));
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://bank-front-eight.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.sendStatus(200);
});

app.use(express.json())
app.use('/api/auth',Authroute)
app.use('/api/admin',AdminRoute)
app.use('/api/transaction',TransactionRoute)
app.use('/api/chat',chatRoute)


mongoose.connect('mongodb+srv://admin:sunsetwest1234RRR@royoapi.3qmdrjq.mongodb.net/Bank?retryWrites=true&w=majority&appName=RoyoApi').then(()=>{

     console.log('db connected')
     app.listen(8081,()=>console.log('server running'))
})
