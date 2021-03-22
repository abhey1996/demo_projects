const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/app', (req, res) => {
    res.json({
        message: "welcome to jwt"
    })
})

app.post('/app/posts', checkToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, user) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "post created...",
                user
            })
        }
    })
})

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        name: 'abhinav',
        email: 'abhey1996@gmail.com'
    }

    jwt.sign({ user }, 'secret', (err, token) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.json({
                token
            })
        }
    })
})


function checkToken(req, res, next) {
    const bearer = req.headers['authorization']

    if (typeof bearer !== "undefined") {
        const bearerToken = bearer.split(' ');
        const token = bearerToken[1]
        req.token = token
        next();
    } else {
        res.sendStatus(403)
    }
}



app.listen(4000, () => {
    console.log("listening on 4000",);
})