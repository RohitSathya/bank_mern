const express=require('express')
const router=express.Router()

const getusercontroller=require('../controller/GetUsersController')
const removeusercontroller=require('../controller/RemoveUserController')

router.get('/getuser',getusercontroller.getuser)
router.delete('/removeuser/:id',removeusercontroller.removeuser)





module.exports=router