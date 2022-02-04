const { Schema, model } = require("mongoose")

const ChatSchema = new Schema({
    users: [
        {
            user_id: { type: String, required: true },
            name: { type: String },
            status: { type: String },
            img: { type: String }
        }
    ],
    messages: [
        {
            user_id: { type: String },
            text: { type: String },
            img:{ type:String }
        }
    ]
})

module.exports = model("Chats", ChatSchema)
