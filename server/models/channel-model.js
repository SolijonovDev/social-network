const { Schema, model } = require("mongoose")

const ChannelSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String},
    status: { type: String },
    img: { type: String },
    users: [
        {
            user_id: { type: String },
            role: { type: String, default: "USER" }
        }
    ],
    messages: [
       {
         user_id: { type: String},
         text: { type: String },
         img: { type: String },
         data: { type: String } 
       }
    ]
})

module.exports = model("Channels", ChannelSchema)
