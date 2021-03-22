const router = require('express').Router();
const authCheck = require('./validateToken')

//  @desc get data 
//  @route GET /posts/
router.get("/", authCheck, (req, res) => {
    res.json({
        posts: "posts",
        valid: "valid"
    })
})

module.exports = router;