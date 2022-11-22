const express = require("express")
const router = express.Router()
const connection = require("../database")

/**
 * create user route
 */
router.post("/", async (req, res) => {
  const { username, password } = req.body
  /**
   * simple data validation
   */
  if (!username || !password) {
    return res.status(400).json({ response: 'empty data fields' })
  }
  connection.connect(err => {
    if (err) {
      console.log(err.message)
      return res.status(400).json({ err: err.message })
    }
    /**
     * create user
     */
    var createUserQuery = { _id:username, password }
    connection.db("threeAlearning").collection("users").insertOne(createUserQuery, function (err, result) {
      if (err) return res.status(400).json({ err: err.message })
      console.log(result)
    })
    /**
     * generate session id 
     */
    let sessionid = 'randomString' + username
    let saveSessionQuery = { sessionid }
    /**
     * make a sessions collection
     */
    connection.db("threeAlearning").collection("sessions").insertOne(saveSessionQuery, function (err, result) {
      if (err) {
        console.log(err.message)
        return res.status(400).json({ err: err.message, code: err.code })}
      return res.cookie('authBiscuit', sessionid).status(200).json({ username, biscuitStatus: 'loggedin' })
    })
  })
})

module.exports = router
