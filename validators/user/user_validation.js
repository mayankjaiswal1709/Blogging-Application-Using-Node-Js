const user = require('../user/userSchema')

module.exports = {
    registerUserValidation: async (req, res, next) => {
        const value = user.registerUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },
}
