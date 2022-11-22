const express = require("express")
const router = express.Router()
const connection = require("../database")

/**http://65.0.102.151/api/auth/ */
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    if (!username || !password) {
        return res.status(400).json({ response: 'empty data fields' })
    }
    if (!req.headers.cookie) {
        console.log('reqhed not true')

        let findUserQuery = { _id: username }
        connection.db("threeAlearning").collection("users").findOne(findUserQuery, function (err, result) {


            if (err) return res.status(400).json({ err: err.message, cod: err })

            if (result) {
                console.log('result true')

                if (password !== result.password) {
                    return res.status(400).json({ response: 'wrong password' })
                } else {
                    let sessionid = 'randomString' + username
                    let saveSessionQuery = { sessionid }
                    connection.db("threeAlearning").collection("sessions").insertOne(saveSessionQuery, function (err, result) {
                        if (err) return res.status(400).json({ err: err.message, code: err.code })
                    })
                    return res.cookie('authBiscuit', sessionid).status(200).json({ username, biscuitStatus: 'loggedin' })
                }
            } else {
                return res.status(400).json({ response: 'wrong username' })
            }
        })
    } else {
        let biscuits = {}
        const biscuitsArray = req.headers.cookie.split(';')
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=')
            biscuits[key] = value
        })
        let receivedsessionid = Object.values(biscuits)[0]

        let verifySessionQuery = { sessionid: receivedsessionid }

        connection.db("threeAlearning").collection("sessions").findOne(verifySessionQuery, (err, result) => {

            if (err) return res.status(400).json({ err: err.message, code: err.code })
            if (result) {
                return res.status(200).json({ biscuitStatus: 'alreadywed' })
            }
            else {
                return res.clearCookie(Object.keys(biscuits)).status(200).json({ redirect: 'true' })
            }
        })

    }
})


/**http://65.0.102.151:3001/api/auth/logout */
router.post('/logout', (req, res, next) => {
    if (!req.headers.cookie) {
        console.log('alredy out')
        return res.status(200).json({ biscuitStatus: 'loggedout' })
    } if (req.headers.cookie) {
        let biscuits = {}
        const biscuitsArray = req.headers.cookie.split(';')
        biscuitsArray.forEach((biscuit) => {
            const [key, value] = biscuit.trim().split('=')
            biscuits[key] = value
        })
        let sessionid = { sessionid: Object.values(biscuits)[0] }
        console.log(sessionid)
        connection.db("threeAlearning").collection("sessions").deleteOne(sessionid, (err, result) => {

            if (err) {
                console.log(err.message)
                return res.status(500).json({ err: err.message, code: err.code })
            }
        })
        return res.clearCookie(Object.keys(biscuits)).status(200).json({ biscuitStatus: 'loggedout' })
    } else {
        return res.status(400).json({ biscuitStatus: 'err' })
    }
})

module.exports = router