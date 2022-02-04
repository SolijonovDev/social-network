const Router=require("express")
const userCon = require("../controllers/user-con")

const router=new Router()

router.get("/",userCon.getUser)
router.get("/info/:id",userCon.getUserInfo)
router.put("/name",userCon.changeName)
router.put("/status",userCon.changeStatus)
router.put("/upload",userCon.fileUpload)

module.exports=router;