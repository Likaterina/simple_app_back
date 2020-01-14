const router = require("express").Router()

const { noCallbacks, hash, validateSmth } = require("./lib")

router.get('/get-current-user', (req, res) => {
    if (req.session.loggedin) {
        res.send(req.session.login)
    } else {
        res.send('Nope')
    }
})

router.get("/", ({ session: { user } }, res) => res.send({ user }))

router.post('/auth', async (req, res) => {
    const login = req.body.login
    const password = hash(req.body.password)
    if (login && password) {
        const user = await noCallbacks('SELECT * FROM users WHERE login = ? AND password = ?', [login, password])
        if (user.length > 0) {
            req.session.loggedin = true
            req.session.login = login
            res.status(200).send("Yr welcome")
        } else {
            res.send('Incorrect Login and/or Password')
        }
        res.end()
    } else {
        res.send('Enter your Login and Password')
        res.end()
    }
})

router.post('/register', validateSmth, async (req, res) => {
    const user = {
        "login": req.body.login,
        "password": hash(req.body.password),
        "email": req.body.email
    }
    const findUser = await noCallbacks('SELECT * FROM users WHERE login = ?', user.login)
    if (findUser.length > 0) {
        res.send('The User is already exist')
    } else {
        try {
            await noCallbacks('INSERT INTO users SET ?', user)
            res.status(200).send({ message: "Yr welcome" })
        }
        catch (error) {
            res.status(400).send({ message: "Smth went wrong" })
        }
    }
})

module.exports = router