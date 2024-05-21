const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const Authroute=require('./router/AuthRoute')
const AdminRoute=require('./router/AdminRoute')
const TransactionRoute=require('./router/TransactionRoute')
const chatRoute=require('./router/ChatRoute')
const socketio = require('socket.io');
app.use(express.json())
app.use(cors())
const nodemailer=require('nodemailer')
const http=require('http')
app.use('/api/auth',Authroute)
app.use('/api/admin',AdminRoute)
app.use('/api/transaction',TransactionRoute)
app.use('/api/chat',chatRoute)
const server=http.createServer(app)
const io=socketio(server,{
  cors:{
     origin:"http://localhost:3000",
     credentials:true
    
    
  },
})

const corsOptions = {
  origin: 'https://bank-front-eight.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

const transport=nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:"spiritroyo2336@gmail.com",
      pass:"xtdekcpwnjsspsip"
  }
})
io.on('connection',(socke)=>{
  console.log('hi')
  socke.on('msg',(data)=>{
    console.log('fjdfkdjfdkjfdkjf')
    console.log(data)
      // const {to,message}=data
      // console.log(to,message)
      // io.emit(to,message)
  })
})



mongoose.connect('mongodb+srv://admin:sunsetwest1234RRR@royoapi.3qmdrjq.mongodb.net/Bank?retryWrites=true&w=majority&appName=RoyoApi').then(()=>{

     console.log('db connected')
     app.listen(5000,()=>console.log('server running'))
})
