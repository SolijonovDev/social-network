const { Schema, model } = require("mongoose")

const TokenSchema = new Schema({
    user_id: { type: String, required: true },
    token:{type:String,unique:true}
})

module.exports = model("Tokens", TokenSchema)
