const userModel = require("../models/user-model");
const uuid = require("uuid")
const path = require("path")

class UserCon {
    async getUser(req, res) {
        try {
            const info = req.user;
            const user = await userModel.findById(info.id)
            if (!user) {
                return res.status(201).json({ message: "Not found User" })
            }
            return res.status(200).json({ message: "Ok", user })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async getUserInfo(req, res) {
        try {
            const id=req.params.id;
            const user = await userModel.findById(id)
            if (!user) {
                return res.status(201).json({ message: "Not found User" })
            }
            return res.status(200).json({ message: "Ok", user:{
                name:user.name,
               img:user.img,
               email:user.email,
               status:user.status
            } })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async changeStatus(req, res) {
        try {
            const { status } = req.body;
            const info = req.user;
            const find = await userModel.findById(info.id)
            if (!find) {
                return res.status(201).json({ message: "User Not found" })
            }
            find.status = status;
            await find.save()
            res.status(200).json({ message: "Ok", status })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async changeName(req, res) {
        try {
            const { name } = req.body;
            const info = req.user;
            const find = await userModel.findById(info.id)
            if (!find) {
                return res.status(201).json({ message: "User Not found" })
            }
            find.name = name;
            await find.save()
            res.status(200).json({ message: "Ok", name })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async fileUpload(req, res) {
        try {
            const { img } = req.files;
            const info = req.user;
            const find = await userModel.findById(info.id)
            if (!find) {
                return res.status(201).json({ message: "User Not found" })
            }
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            find.img = fileName
            await find.save()
            res.status(200).json({ message: "Ok", photo: find.img })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
}

module.exports = new UserCon()