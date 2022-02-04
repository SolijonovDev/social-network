const uuid=require("uuid")
const path=require("path")
const fileService=require("../service/file.js")
class FileCon{
    async photoUpload(req, res) {
        try {
            const { img } = req.files;
            const fileName=await fileService.photoUpload(img)
            return res.status(200).json({ message: "Ok", img:fileName })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
}

module.exports=new FileCon()