const GroupModel = require("../models/group-model.js");
const userModel = require("../models/user-model.js");
const fileService=require("../service/file.js")

class GroupCon {
    async getOneGroup(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(201).json({ message: "Bad id" })
            }
            const group = await GroupModel.findById(id)
            if (!group) {
                return res.status(201).json({ message: "Not found" })
            }
            return res.status(200).json({ message: "Ok", group })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async create(req, res) {
        try {
            const { name, status, img } = req.body;
            const info = req.user;
            if (!name) {
                return res.status(201).json({ message: "Error Name" })
            }
            const user = await userModel.findById(info.id)
            const group = await GroupModel.create({
                name, img: img || "group-foto.jpg", status,
                users: [{ user_id: info.id, role: "ADMIN" }]
            })
            await group.save()
            user.chats.unshift({ type: "GROUP", group_id: group._id, img: group.img, name })
            await user.save()
            return res.status(200).json({ message: "Ok", group: { type: "GROUP", group_id: group._id, img: group.img, name } })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async addMessage(req, res) {
        try {
            const { text, group_id } = req.body;
            const info = req.user;
            const group = await GroupModel.findOne({ _id: group_id })
            if (!group) {
                return res.status(201).json({ message: "Not found group" })
            }
            const user = await userModel.findById(info.id)
            await group.users.forEach(i => {
                if (i.user_id === info.id) {
                    group.messages.push({ user_id: info.id, text, img: user.img })
                    group.save()
                }
            })
            return res.status(200).json({ message: "Ok", messages: group.messages })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async sendPhoto(req, res) {
        try {
            const id = req.params.id;
            const { img } = req.files;
            const fileName = await fileService.photoUpload(img)
            const info = req.user;
            const group = await GroupModel.findById(id)
            if (!group) {
                return res.status(201).json({ message: "Not found chat" })
            }
            group.users.forEach(s => {
                if (s.user_id === info.id) {
                    group.messages.push({ user_id: info.id, img: fileName })
                }
            })
            group.save()
            return res.status(200).json({ message: 'Ok', messages: group.messages })
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Error" })
        }
    }
    async photoUpload(req, res) {
        try {
            const { img } = req.files;
            const fileName = await fileService.photoUpload(img)
            return res.status(200).json({ message: 'Ok', img:fileName })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
}

module.exports = new GroupCon()