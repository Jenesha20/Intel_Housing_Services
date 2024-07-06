const mongoose = require('mongoose')

module.exports.connectdb = ()=>{
    return mongoose.connect("mongodb+srv://jeneshamalars:jenesha@housedata.uzxz4ks.mongodb.net/?retryWrites=true&w=majority&appName=Housedata");
}