const mongoose = require('mongoose');


const baseUserSchema = {
    name: {
        type: String,
        required: true
    },
    mobno: {
        type: Number,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
};

const publicUserSchema = new mongoose.Schema({
    ...baseUserSchema,
    street: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});


const workerSchema = new mongoose.Schema({
    ...baseUserSchema,
    street: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    adharId: {
        type: String,
        required: true
    },
    workerId: {
        type: String,
        required: true
    },
    workType:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
});

const PublicUser = mongoose.model('PublicUser', publicUserSchema);
const Worker = mongoose.model('Worker', workerSchema);

module.exports = { PublicUser, Worker };
