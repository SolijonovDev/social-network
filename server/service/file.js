const uuid=require("uuid")
const path=require("path")

class fileService{
    async photoUpload(img) {
        try {
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            return fileName;
        } catch (e) {
              throw Error(e)
        }
    }
}

module.exports=new fileService()