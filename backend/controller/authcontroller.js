const usermodel=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const nodemailer=require('nodemailer')


const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"spiritroyo2336@gmail.com",
        pass:"xtdekcpwnjsspsip"
        
    }
})
const register=async(req,res)=>{
    console.log(req.body)
    const {username,password,email,address,phone,depositType}=req.body
    const gensalt=await bcrypt.genSalt(10)
    const hp=await bcrypt.hash(password,gensalt)
    const findemail=await usermodel.findOne({email:email})
    if(!findemail || findemail==''){
        const data=await usermodel.create({username:username,password:hp,email:email,address:address,phone:phone,type:depositType})
        console.log(data)
        res.json({message:'s'})
        const mailOptions = {
            from: 'spiritroyo2336@gmail.com', // replace with your Gmail email
            to: email,
            subject: 'Welcome to BankMangement App',
            text: 'Registration Succesfull'
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
    else{
        res.json({message:'f'})
    }

}

const login=async(req,res)=>{
    const {username,password}=req.body
    const findname=await usermodel.findOne({username:username})
    if(!findname||findname==''){
        console.log('noname')
        res.json({message:'f'})
    }
    else{
        const match=await bcrypt.compare(password,findname.password)
        if(match){
            const token=jwt.sign({id:findname._id},process.env.JWT_TOKEN,{expiresIn:'1h'})
            const active=await usermodel.findOne({_id:findname._id})
            if(active.status=='active'){
                
            res.json({userdetail:findname,token:token,message:'s'})

            }
            else{
                res.json({message:'f'})
            }
        }
        else{
            res.json({message:'f'})
            console.log('not')
        }

    }
    

}
const active=async(req,res)=>{
    const {id,s}=req.body
    console.log(id,s)
    const data=await usermodel.findByIdAndUpdate({_id:id},{status:s})
    res.json({message:'s'})
    console.log(data)

}
module.exports={register,login,active}
