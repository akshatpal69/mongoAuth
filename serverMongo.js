const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const useRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const connection = require("./database")
const ENV = require('./envDeploy')

//middleware
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use("/api/user", useRoute)
app.use("/api/auth", authRoute)
app.use("/", express.static(path.join(__dirname, "public")))


app.listen(ENV.WEB_PORT, () => {
  console.log(`app running on ${ENV.WEB_HOST}:${ENV.WEB_PORT}`)
})
