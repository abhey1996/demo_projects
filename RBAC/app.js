const express = require('express')
const morgan = require('morgan')
const createHttpError = require('http-errors')
require('dotenv').config()
const mongoose = require('mongoose')
const session = require('express-session')
const connectFlash = require('connect-flash')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const { ensureLoggedIn } = require('connect-ensure-login')
const { roles } = require('./utils/constants')


// initialization
const app = express()
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// const MongoStore = connectMongo(session)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true  // for https
    },
    // store: new MongoStore({ })
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport.auth')
app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

app.use(connectFlash())
app.use((req, res, next) => {
    res.locals.messages = req.flash()
    next()
})


//routes
app.use('/', require('./routes/index.route'))
app.use('/auth', require('./routes/auth.route'))
app.use('/user', ensureLoggedIn({ redirectTo: '/auth/login' }), require('./routes/user.route'))
app.use('/admin', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, require('./routes/admin.route'))


//middlewares
app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.status(error.status)
    res.render('error_40x', { error })
})


//db connection
mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('db connected')
        app.listen(process.env.PORT || 3000, () => console.log("server running"))
    })
    .catch(e => console.log(e))

// function authCheck(req, res, next) {
//     if (req.isAuthenticated()) {
//         next()
//     } else {
//         res.redirect('/auth/login')
//     }
// }

function ensureAdmin(req, res, next) {
    if (req.user.role === roles.admin) {
        next()
    } else {
        req.flash('warning', 'You are not authorized for this route')
        res.redirect('/')
    }

}

// function ensureMod(req, res, next) {
//     if (req.user.role === roles.moderator) {
//         next()
//     }else{
    //     req.flash('warning', 'You are not authorized for this route')
    //     res.redirect('/')
// }
// }
