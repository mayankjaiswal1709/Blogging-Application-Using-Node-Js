const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment_title: {
        type: String,
        //require: true,
    },
    comment_description: {
        type: String,
        //require: true,
    },
    comment_Role: {
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
