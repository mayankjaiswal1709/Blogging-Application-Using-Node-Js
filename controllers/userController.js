const fs = require('fs');
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../models/userSchema')
const { transpoter } = require('../service/mailService')

// user signup API
const userSignup = async (req, res) => {
    const { userEmail, userPassword } = req.body
    const newUser = new userSchema(req.body);
    try {
        const existingUser = await userSchema.findOne({ userEmail: userEmail })
        if (existingUser) {
            await fs.unlink(req.file.path)
            return res.status(409).json({
                success: true,
                message: "Email already registered"
            })
        } else {
            newUser.userPassword = await bcrypt.hash(userPassword, 10)
            newUser.profilePic = `/uploads/${(req.file.filename)}`;
            await newUser.save();
            return res.status(200).json({
                success: true,
                message: "Registration successfull"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// user login API
const userLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body
    try {
        const userData = await userSchema.findOne({ userEmail: userEmail })
        if (!userData) {
            return res.status(200).json({
                success: false,
                message: "Email id not found"
            })
        } else {
            const passwordMatch = await bcrypt.compare(userPassword, userData.userPassword)
            if (userData && passwordMatch) {
                const token = jwt.sign({ userId: userData._id }, process.env.JWT, { expiresIn: "5d" })
                return res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    token: token
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                })
            }
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// forget Password API
const forgetPassword = async (req, res) => {
    const { userEmail } = req.body
    const userData = await userSchema.findOne({ userEmail: userEmail })
    try {
        if (userData != null) {
            const token = jwt.sign({ userId: userData._id }, process.env.JWT, { expiresIn: "10m" })
            const resetPasswordLink = `https://127.0.0.1:27017/api/user/resetpassword/${userData._id}/${token}`
            await transpoter.sendMail({
                from: process.env.EMAIL,
                to: req.body.userEmail,
                subject: "Password recovery link",
                html: `<p>below link is valid only for 5 minutes</p><a href=${resetPasswordLink}}>Click on link to reset the password</a>`,
            })
            res.status(200).json({
                success: true,
                message: "Mail sent successfully",
                token: token,
                UserId: userData._id,
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Email not found",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// reset password API
const resetPassword = async (req, res) => {
    const { userId, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const User = await userSchema.findById(userId);
        if (User != null) {
            jwt.verify(token, process.env.JWT);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(User._id),
                {
                    $set: { userPassword: hashedPassword },
                };
                res.status(200).json({
                    success: true,
                    message: "Password updated successfully",
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Password and confirmPassword is not match",
                });
            }
        } else {
            res.status(403).json({
                success: false,
                message: "email user is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { userSignup, userLogin, forgetPassword, resetPassword }
