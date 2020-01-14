const connection = require("./db")
const crypto = require('crypto')
const Joi = require('joi')

const SALT = 'asslist'

const hash = password => {
    return crypto
        .createHash('sha256')
        .update(password + SALT)
        .digest("base64")
}

const noCallbacks = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results, fields) => {  
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

const schema = Joi.object({
    login: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
    email: Joi.string().email().required()
})

const validateSmth = (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send("Check your inputs")
    next()
}

module.exports = { noCallbacks, hash, validateSmth }