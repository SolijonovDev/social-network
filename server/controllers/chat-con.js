const ChatModel = require("../models/chat-model.js")
const UserModel = require("../models/user-model.js")
const fileService = require("../service/file.js")

class ChatCon {
    async getOneChat(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(201).json({ message: "No id" })
            }
            const info = req.user;
            const findchat = await ChatModel.findById(id)
            if (!findchat) {
                return res.status(201).json({ message: "Bad id" })
            }
            let user;
            findchat.users.forEach(s => {
                if (s.user_id != info.id) {
                    user = s;
                }
            });
            const findUser = await UserModel.findById(user.user_id)
            return res.status(200).json({
                message: "Ok",
                chat_id: id,
                user: {
                    img: findUser.img,
                    name: findUser.name,
                    email: findUser.email,
                    id: findUser._id,
                    status: findUser.status
                },
                messages: findchat.messages
            })
        } catch (e) {
            return res.status(500).json({message: "Error"})
        }
    }

    async create(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(201).json({ message: "Error" })
            }
            const friend = await UserModel.findById(id)
            const info = req.user;
            const users = [{ user_id: info.id, name: info.name, img: info.img }]
            users.push({ user_id: friend._id, name: friend.name, img: friend.img })
            const chat = await ChatModel.create({ users })
            await chat.save()
            const findUser = await UserModel.findById(info.id)
            if (!friend || !findUser) {
                return res.status(201).json({ message: "Error" })
            }
            findUser.chats.push({ group_id: chat._id, user_id: friend._id, name: friend.name, img: friend.img })
            friend.chats.push({ group_id: chat._id, user_id: info.id, name: info.name, img: info.img })
            await findUser.save()
            await friend.save()
            return res.status(200).json({
                message: 'Ok',
                chatInfo: {
                    type: "CHAT",
                    group_id: chat._id,
                    user_id: friend._id,
                    id: friend._id,
                    name: friend.name,
                    status: friend.status,
                    img: friend.img
                },
                messages: []
            })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async add(req, res) {
        try {
            const { text, chat_id } = req.body;
            if (!text) {
                return res.status(201).json({ message: "Empty text" })
            }
            const info = req.user;
            const chat = await ChatModel.findById(chat_id)
            if (!chat) {
                return res.status(201).json({ message: "Not found chat" })
            }
            chat.users.forEach(s => {
                if (s.user_id === info.id) {
                    chat.messages.push({ user_id: info.id, text })
                }
            })
            chat.save()
            return res.status(200).json({ message: 'Ok', messages: chat.messages })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
    async addPhoto(req, res) {
        try {
            const id = req.params.id;
            const { img } = req.files;
            const fileName = await fileService.photoUpload(img)
            const info = req.user;
            const chat = await ChatModel.findById(id)
            if (!chat) {
                return res.status(201).json({ message: "Not found chat" })
            }
            chat.users.forEach(s => {
                if (s.user_id === info.id) {
                    chat.messages.push({ user_id: info.id, img: fileName })
                }
            })
            chat.save()
            return res.status(200).json({ message: 'Ok', messages: chat.messages })
        } catch (e) {
            return res.status(500).json({ message: "Error" })
        }
    }
}

module.exports = new ChatCon()