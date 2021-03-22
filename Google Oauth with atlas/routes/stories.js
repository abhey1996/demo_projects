const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');

// add story page
// route localhost:3000/stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// Posts story to database
// route localhost:3000/stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        const story = await Story.create(req.body);
        res.redirect("/dashboard")
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

//  Get All stories
//  route localhost:3000/stories
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('stories/index', {
            stories
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

// get particular story
// route localhost:3000/stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()

        if (!story) {
            res.render('error/404')
        }

        res.render('stories/show', {
            story
        })

    } catch (error) {
        console.error(error)
        res.render('error/404')
    }
})

// get edit story page
// route localhost:3000/stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean()

        if (!story) {
            res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/stories/add')
        } else {
            res.render('stories/edit', {
                story
            })
        }
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

// update particular story
// route localhost:3000/stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        }
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

// delete particular story
// route localhost:3000/stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)

        if (!story) {
            res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.render('error/500')
        } else {
            await Story.remove({ _id: req.params.id })
            res.redirect('/dashboard')
        }
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

//  Get All stories by a user
//  route localhost:3000/stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
            .populate('user')
            .lean()

        res.render('stories/index', {
            stories
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router;