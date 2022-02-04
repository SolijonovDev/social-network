const Router=require("express")
const GroupCon=require("../controllers/group-con.js")
const router=new Router()

router.get("/:id",GroupCon.getOneGroup)
router.post("/create",GroupCon.create)
router.post("/add",GroupCon.addMessage)
router.post("/photoUpload",GroupCon.photoUpload)
router.post("/send-photo/:id",GroupCon.sendPhoto)

module.exports=router