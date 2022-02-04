const ChannelModel = require("../models/channel-model.js");
const userModel = require("../models/user-model.js");
const fileService=require("../service/file.js")

class ChannelCon {
    async getOneChannel(req, res) {
        try {
            const id = req.params.id;
            const user=req.user;
            let admin=false
            if (!id) {
                return res.status(201).json({ message: "Bad id", id })
            }
            const channel = await ChannelModel.findById(id)
            channel.users.forEach(s=>{
                if(s.user_id===user.id){
                    admin=true
                }
            })
            return res.status(200).json({ message: "Ok", channel:{name:channel.name,id:channel._id,img:channel.img,messages:channel.messages,admin} })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async create(req, res) {
        try {
            const { name, status, img } = req.body;
            const info = req.user;
            if(!name){
                return res.status(201).json({message:"Error"})
            }
            const user = await userModel.findById(info.id)
            const channel = await ChannelModel.create({
                name, img: img || "channel-foto.png", status,
                users: [{ user_id: info.id, role: "ADMIN" }]
            })
            user.chats.unshift({ type: "CHANNEL", group_id: channel._id, img: channel.img, name })
            await user.save()
            await channel.save()
            return res.status(200).json({ message: "Ok", channel: { type: "CHANNEL", group_id: channel._id, img: channel.img, name } })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async addMessage(req, res) {
        try {
            const { text, channel_id,img } = req.body;
            if(!text){
                return res.status(200).json({message:"Empty text"})
            }
            const info = req.user;
            const channel = await ChannelModel.findById(channel_id)
            if (!channel) {
                return res.status(201).json({ message: "Not found channel" })
            }
            await channel.users.forEach(i => {
                if ((i.user_id === info.id) && (i.role === "ADMIN")) {
                    channel.messages.push({ user_id: info.id, text,img })
                    channel.save()
                }
            })
            return res.status(200).json({ message: "Ok", messages:channel.messages })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async sendPhoto(req, res) {
        try {
            const id=req.params.id;
            const { img } = req.files;
            const fileName = await fileService.photoUpload(img)
            const info = req.user;
            const channel = await ChannelModel.findById(id)
            if (!channel) {
                return res.status(201).json({ message: "Not found channel" })
            }
            await channel.users.forEach(i => {
                if ((i.user_id === info.id) && (i.role === "ADMIN")) {
                    channel.messages.push({ user_id: info.id,img:fileName })
                }
            })
            channel.save()
            return res.status(200).json({ message: "Ok", messages:channel.messages })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
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

module.exports = new ChannelCon()