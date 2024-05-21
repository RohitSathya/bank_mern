const transactionmodel=require('../models/transaction')
const accountmodel=require('../models/account')
const nodemailer=require('nodemailer')


const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"spiritroyo2336@gmail.com",
        pass:"xtdekcpwnjsspsip"
        
    }
})

const getAllTransaction=async(req,res)=>{

    const transactions=await transactionmodel.find()
    res.json(transactions)
}
const getTransactionbyID=async(req,res)=>{
    const transactionid=req.params.id
    console.log(transactionid)
    const data1=await transactionmodel.find({fromaccountno:transactionid})
    const data=await transactionmodel.find({toaccountno:transactionid})
    const combinedTransactions = [...data1, ...data];
    console.log(combinedTransactions)
    res.json({th:combinedTransactions})
    

    
   
}
const deposit=async(req,res)=>{
    const {accountno,balance}=req.body
    const data=await accountmodel.create(req.body)
    const ch=await accountmodel.find({accountno:accountno})
    const fetchbal=ch.map((d)=>d.balance)
    let t=0
        for(let i=0;i<fetchbal.length;i++){
            t=t+fetchbal[i]
        }
    const deposithistory=await transactionmodel.create({fromaccountno:accountno,toaccountno:accountno,type:'deposit',amount:balance})
    res.json({bal:t})

    
    

    

    

}
const withdraw=async(req,res)=>{
    const {accountno,balance}=req.body
    const data=await accountmodel.create({accountno:accountno,balance:balance*-1})
    const ch=await accountmodel.find({accountno:accountno})
    const fetchbal=ch.map((d)=>d.balance)
    let t=0
        for(let i=0;i<fetchbal.length;i++){
            t=t+fetchbal[i]
        }
    if(t==0){
        const mailOptions = {
            from: 'spiritroyo2336@gmail.com', // replace with your Gmail email
            to: 'rohitsathya1825@gmail.com',
            subject: 'Welcome to BankMangement App',
            text: 'Your Balance Got 0'
          };
          transport.sendMail(mailOptions,(error,info)=>{
             if(error){
                console.log(error)
             }
             else{
                console.log('email send'+info.response)
             }
          })
    }
    const withhistory=await transactionmodel.create({fromaccountno:accountno,toaccountno:accountno,type:'withdrawal',amount:balance})
    res.json({bal:t})
    


   

}
const transfer=async(req,res)=>{
    console.log(req.body)
    const {fromaccountno,toaccountno,amount}=req.body
    const transfer=await transactionmodel.create(req.body)
    const wit=await accountmodel.create({accountno:fromaccountno,balance:amount*-1})
    const dep=await accountmodel.create({accountno:toaccountno,balance:amount})
    res.json({message:'s'})

}
const balance=async(req,res)=>{
    const id=req.params.id
    const data=await accountmodel.find({accountno:id})
    console.log(data)
    if(!data||data==''){
         res.json({balance:0})
    
    }
    else{
        let total=0
    for (let x of data){
        total+=x.balance
        
    }
    if(total==0){
        const mailOptions = {
            from: 'spiritroyo2336@gmail.com', // replace with your Gmail email
            to: 'rohitsathya1825@gmail.com',
            subject: 'Welcome to BankMangement App',
            text: 'Your Balance Got 0'
          };
          transport.sendMail(mailOptions,(error,info)=>{
             if(error){
                console.log(error)
             }
             else{
                console.log('email send'+info.response)
             }
          })
    }
    res.json({balance:total})
    console.log(total)

    }
    
   
   
    

}
module.exports={getAllTransaction,getTransactionbyID,deposit,withdraw,transfer,balance}