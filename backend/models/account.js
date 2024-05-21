const mongoose=require('mongoose')

const accountSchema=mongoose.Schema({

    accountno:{
        type:String
    },
    balance:{
        type:Number
    }
})
const accountModel=mongoose.model('Account',accountSchema)
module.exports=accountModel