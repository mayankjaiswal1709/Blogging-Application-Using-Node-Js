const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        // require: true,
    },
    userEmail: {
        type: String,
        // require: true,
    },
    userPassword: {
        type: String,
        // require: true,
    },
    userPhone: {
        tyep: Number,
        // require: true
    },
    userCity: {
        type: String,
        // require: true,
    },
    userState: {
        type: String,
        // require: true,
    },
    userAddress: {
        type: String,
        // require: true,
    },
    profilePic: {
        type: String,
        // require: false,
    },
    userRole: {
        type: String,
        default: "user",
    },
    isActive: {
        type: Boolean,
        // require: true,
        default: true
    },
})
userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)
