const router=require('express').Router()
const Controller=require('../controller/user')
const verify=require('../routes/authVerify')


router.post('/signUp',Controller.signUp)
router.post('/login',Controller.login)
router.get('/get',verify,Controller.getLearner)
router.post('/create',verify,Controller.createCourse)
router.get('/getCourse',verify,Controller.getCourse)

module.exports=router