const usermodel=require('../models/user')
const bcrypt=require('bcrypt')
const register=async(req,res)=>{
    console.log(req.body)
    const {username,password,email}=req.body
    const gensalt=await bcrypt.genSalt(10)
    const hp=await bcrypt.hash(password,gensalt)
    const findemail=await usermodel.findOne({email:email})
    if(!findemail || findemail==''){
        const data=await usermodel.create({username:username,password:hp,email:email})
        console.log(data)
        res.json({message:'s'})
    }
    else{
        res.json({message:'f'})
    }

}

module.exports={register}