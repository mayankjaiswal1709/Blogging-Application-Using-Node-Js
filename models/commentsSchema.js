const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    cmnt_title: {
        type: String,
        //require: true,
    },
    cmnt_description: {
        type: String,
        //require: true,
    },
    cmnt_Role: {
        type: String,
        default: "user",
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    },
})
commentSchema.set('timestamps', true)
module.exports = mongoose.model('comment', commentSchema)
