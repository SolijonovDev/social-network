const Router=require("express")
const ChatCon=require("../controllers/chat-con.js")

const router=new Router()

router.get("/:id",ChatCon.getOneChat)
router.post("/create",ChatCon.create)
router.post("/add-message",ChatCon.add)
router.post("/add-photo/:id",ChatCon.addPhoto)


module.exports=router