const usermodel=require('../models/user')

const getuser=async(req,res)=>{

    const data=await usermodel.find()
    if(!data||data==''){
        res.json({message:'f'})
    }
    else{
        res.json({ud:data})
    }

}
const Exceptgetuser=async(req,res)=>{
    const id=req.params.id

    const user=await usermodel.find()
    const filteruser=await user.filter(u=>u.accountno!=id)
    res.json(filteruser)

}
module.exports={getuser,Exceptgetuser}