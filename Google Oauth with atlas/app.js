const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session')
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const MongoStore = require('connect-mongo')(session);
const { dirname } = require('path');

//load config 
dotenv.config({ path: './config/config.env' });

//passport config 
require('./config/passport')(passport)

//Database Connection
connectDB();

const app = express();

//Body  Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//morgan used for logging 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//handlebars helpers
const { formatDate, truncate, stripTags, editIcon, select } = require('./helpers/hbs');

//handlebars
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    },
    defaultLayout: 'main', extname: '.hbs'
}))
app.set('view engine', '.hbs')

//express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
})

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//routes 
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running ${process.env.NODE_ENV} mode on port ${PORT}`))