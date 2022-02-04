const { Schema, model } = require("mongoose")

const GroupSchema = new Schema({
    name:{type:String,required:true},
    username: { type: String},
    status: { type: String},
    img: { type: String},
    users: [
       {
        user_id:{type:String},
        role:{type:String},
        name:{type:String},
        img:{type:String}
       }
    ],
    messages: [
       {
        user_id:{type:String},
        img:{type:String},
        text:{type:String}
       }
    ]
})

module.exports = model("Groups", GroupSchema)
