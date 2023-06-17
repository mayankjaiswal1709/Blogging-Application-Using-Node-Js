const express = require('express')
const router = express.Router();
const user = require('../controllers/userController')
const { upload } = require('../middleware/imageStorage')
const validate = require('../validators/user/user_validation')

router.post('/signup', upload.single("profilePic"), validate.registerUserValidation, user.userSignup)
router.post('/login', user.userLogin)
router.post('/forgetpassword', user.forgetPassword)
router.post('/resetpassword/:userId/:token', user.resetPassword)

module.exports = router
