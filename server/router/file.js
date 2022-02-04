const Router=require("express")
const ChatCon=require("../controllers/chat-con.js")
const fileCon = require("../controllers/file-con.js")

const router=new Router()

router.post("/photoupload",fileCon.photoUpload)


module.exports=router