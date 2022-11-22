const ENV = require("./envDeploy")
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `${ENV.DB_PROT}${ENV.DB_USER}${ENV.DB_PASS}${ENV.DB_HOST}${ENV.DB_ARGS}`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

module.exports = client
