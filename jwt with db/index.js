const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();

dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => console.log("db connected"))

//body parser
app.use(express.json());


//routes
app.use('/api/user', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(3000, () => console.log("server running"))