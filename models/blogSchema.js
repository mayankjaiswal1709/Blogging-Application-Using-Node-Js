const { boolean, string } = require("joi")
const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        //require: true,
    },
    blogDescription: {
        type: String,
        //require: true,
    },
    blogStatus: {
        type: Boolean,
        //require: true,
        default: true
    },
    blogImg: {
        type: String,
        //require: true
    },
    blogRole: {
        type: String,
        default: "user",
    },
    bloglike: {
        type: String,
        default: true,
    },
    isActive: {
        type: Boolean,
        //require: true,
        default: true
    },
})
blogSchema.set('timestamps', true)
module.exports = mongoose.model('blog', blogSchema)
