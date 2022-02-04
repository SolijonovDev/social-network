const Router=require("express")
const AuthCon=require("../controllers/auth-con.js")

const router=new Router()

router.post('/registration',AuthCon.registration)
router.post('/login',AuthCon.login)
router.get('/refresh',AuthCon.refresh)

module.exports=router;