const mongoose=require('mongoose')

const transactionSchema=mongoose.Schema({


    type: {
        type: String,
      
        enum: ['withdrawal', 'deposit', 'transfer']
    },
    fromaccountno:{
        type:String
    },
    toaccountno:{
        type:String
    },
    amount:{
        type:Number
    },
    transactionId: {
        type: String,
        default: function() {
            return this._id.toString();
        },
        unique: true
    }
    


})
const transactionmodel=mongoose.model('Transaction',transactionSchema)
module.exports=transactionmodel