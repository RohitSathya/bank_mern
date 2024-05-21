const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const Authroute=require('./router/AuthRoute')
const AdminRoute=require('./router/AdminRoute')
const TransactionRoute=require('./router/TransactionRoute')
const chatRoute=require('./router/ChatRoute')
app.use(cors())
app.use(express.json())
app.use('/api/auth',Authroute)
app.use('/api/admin',AdminRoute)
app.use('/api/transaction',TransactionRoute)
app.use('/api/chat',chatRoute)


mongoose.connect('mongodb+srv://admin:sunsetwest1234RRR@royoapi.3qmdrjq.mongodb.net/Bank?retryWrites=true&w=majority&appName=RoyoApi').then(()=>{

     console.log('db connected')
     app.listen(8081,()=>console.log('server running'))
})
