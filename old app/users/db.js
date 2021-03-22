var mongoose = require('mongoose');
var connectionString = "mongodb://localhost:27017/node-api";

mongoose.connect(process.env.MONGO_URI || connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('./user.model')
}