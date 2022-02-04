const generateToken = require('./../service/token');
const dto = require("../dto/index.js")
const UserModel = require("../models/user-model.js")
const TokenModel = require("../models/token-model.js")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


class AuthCon {
    async registration(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(403).json({ message: "Error" })
            }
            const findUser = await UserModel.findOne({ email })
            if (findUser) {
                return res.status(201).json({ message: `Already yes user` })
            }
            const hashPassword = await bcrypt.hash(password, 2)
            const chats = [{ type: "GROUP", group_id: "61f6bee1cd735dad8407953e", img: "group-foto.jpg", name: "Anonymous" }]
            const user = await UserModel.create({ name, email, password: hashPassword, chats })
            const tokens = await generateToken(dto(user))
            const token = await TokenModel.create({ user_id: user._id, token: tokens.refreshToken })
            token.save()
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.status(200).json({ message: "Ok reg", user, token: tokens.accessToken })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(403).json({ message: "Error" })
            }
            const findUser = await UserModel.findOne({ email })
            if (!findUser) {
                return res.status(201).json({ message: "Not found user " })
            }
            const validPassword = await bcrypt.compare(password, findUser.password)
            if (!validPassword) {
                return res.status(201).json({ message: "Bad password" })
            }
            const tokens = await generateToken(dto(findUser))
            const token = await TokenModel.create({ user_id: findUser._id, token: tokens.refreshToken })
            token.save()
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json({ message: "Ok login", token: tokens.accessToken })
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(401).json({ message: "Ne avtorizovan" })
            }
            const userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
            const findToken = await TokenModel.findOne({ user_id: userInfo.id })
            if (!userInfo) {
                return res.status(401).json({ message: "Ne avtorizovan" })
            }
            const user = await UserModel.findById(userInfo.id);
            const tokens = await generateToken(dto(user))
            findToken.refreshToken = tokens.refreshToken;
            findToken.save()
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({ token: tokens.accessToken });
        } catch (e) {
            return res.status(403).json({ message: "Error" })
        }
    }
}

module.exports = new AuthCon()