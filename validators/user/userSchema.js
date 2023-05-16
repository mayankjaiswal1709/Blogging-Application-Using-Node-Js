const joi = require('joi')
const userValidationSchema = {
    registerUser: joi
        .object({
            userName: joi.string().max(20).required(),
            userEmail: joi.string().email({ tlds: { allow: false } }).trim().required(),
            userPassword: joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).required(),
            userPhone: joi.number().integer().min(1000000000).max(9999999999).message("Invalid Mobile Number").required(),
            userCity: joi.string().required(),
            userState: joi.string().required(),
            userAddress: joi.string().required(),
        })
        .unknown(true),
};

module.exports = userValidationSchema;
