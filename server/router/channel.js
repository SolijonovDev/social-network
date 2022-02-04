const Router=require("express")
const ChannelCon=require("./../controllers/channel-con.js")
const router=new Router()

router.get("/:id",ChannelCon.getOneChannel)
router.post("/create",ChannelCon.create)
router.post("/photoUpload",ChannelCon.photoUpload)
router.post("/sendPhoto/:id",ChannelCon.sendPhoto)
router.post("/add",ChannelCon.addMessage)

module.exports=router