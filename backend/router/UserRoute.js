const express=require('express')
const router=express.Router()
const logincontroller=require('../controller/LoginController')
const registercontroller=require('../controller/RegisterController')
const profilecontroller=require('../controller/ProfileController')
const getusercontroller=require('../controller/GetUsersController')

router.post('/login',logincontroller.login)
router.post('/register',registercontroller.register)
router.post('/profile',profilecontroller.profile)
router.get('/Egetuser/:id',getusercontroller.Exceptgetuser)

module.exports=router
