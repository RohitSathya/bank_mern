const express=require('express')
const router=express.Router()

const Transactioncontroller=require('../controller/TransactionController')
const loancontroller=require('../controller/loancontroller')

router.get('/getalltransaction',Transactioncontroller.getAllTransaction)
router.get('/gettransactionbyid/:id',Transactioncontroller.getTransactionbyID)
router.post('/deposit',Transactioncontroller.deposit)
router.post('/withdraw',Transactioncontroller.withdraw)
router.post('/transfer',Transactioncontroller.transfer)
router.get('/balance/:id',Transactioncontroller.balance)
router.post('/apply-loan', loancontroller.applyloan);
router.get('/loan-status/:id', loancontroller.status);
router.get('/loan-approval', loancontroller.getloan);
router.delete('/loan-reject/:id', loancontroller.rejectloan);
router.get('/loan-approve/:id', loancontroller.acceptloan);

module.exports=router