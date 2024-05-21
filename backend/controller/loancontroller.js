const loanmodel=require('../models/loan')
const accountmodel=require('../models/account')
const applyloan=async(req,res)=>{
  console.log(req.body)
  const data=await loanmodel.create(req.body)
  res.json({message:'s'})

}
const status=async(req,res)=>{
  const id=req.params.id
  const data=await loanmodel.find({userId:id})
  if(!data||data==''){
    console.log(1)
    res.json({message:'f'})
  }
  else{
    console.log(134343)
    res.json({ls:data})
  }

}
const getloan=async(req,res)=>{
  const data=await loanmodel.find()
  if(!data||data==''){
    res.json({message:'f'})
  }
  else{
    res.json({ls:data})
  }

}
const acceptloan=async(req,res)=>{
  const id=req.params.id
  const data=await loanmodel.findByIdAndUpdate({_id:id},{status:"Approved"})
  const getbal=await accountmodel.findOne({accountno:id})
  if(!getbal||getbal==''){
    const d=await accountmodel.create({accountno:id,balance:data.loanAmount})
    res.json({message:'s'})
  }
  else{
    const bal=getbal.balance
    const e=await accountmodel.findOneAndUpdate({accountno:id},{balance:bal+data.loanAmount})
    res.json({message:'s'})

  }
  // const bal=getbal.balance
  console.log(getbal)
 

}

const rejectloan=async(req,res)=>{
  const id=req.params.id
  const data=await loanmodel.findByIdAndUpdate({_id:id},{status:"Rejected"})


  res.json({message:'s'})
}
module.exports={applyloan,getloan,rejectloan,status,acceptloan}