const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String },
    img: { type: String },
    chats: [{
        type:{type:String,default:"CHAT"},
        group_id: { type: String },
        user_id: { type: String },
        img: { type: String },
        name: { type: String }
    }]
})

module.exports = model("Users", UserSchema)
