require('rootpath')();
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors');



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use('/users', require('./users/user.controller'));



var port = process.env.NODE_ENV === 'production' ? (process.env.node || 80) : 3000;
app.listen(port, () => {
    console.log("Listening on port:", port);
}
); 