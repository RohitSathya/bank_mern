const express=require('express');
const router=express.Router();
const authcontroller=require('../controller/authcontroller')
const getusercontroller=require('../controller/GetUsersController')
const editcontroller=require('../controller/EditUsercontroller')

router.post('/register',authcontroller.register)
router.post('/login',authcontroller.login)
router.post('/active',authcontroller.active)
router.get('/Egetuser/:id',getusercontroller.Exceptgetuser)
router.post('/edituser',editcontroller.edit)

module.exports=router