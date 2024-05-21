// models/Loan.js
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type:String,
  },
  loanAmount: {
    type: Number,
    required: true
  },
  durationMonths: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  balance:{
    type:String
  },
  status:{
    type:String,
    default:"pending"
  }
 
  // You can include additional fields as needed
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
