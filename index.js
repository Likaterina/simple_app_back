const app = require("express")()
const http = require("http").createServer(app)
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require("path")
const cors = require("cors")

const PORT = 1488

app.use(bodyParser.json())

app.use(cors())

app.use(
  session({
    secret: "lolkek",
    resave: true,
    saveUninitialized: true
  })
)

const authRouter = require("./auth/routes")

app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.send({ title: "Ne zvoni s`uda bolshe" })
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../from/public/index.html"))
})

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
