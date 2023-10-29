const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define an array of valid mental health disorders
const historyOptions = ['No Known History', 'Anxiety Disorders', 'Depression', 'Bipolar Disorder', 'Diagnosed PTSD', 'Schizophrenia', 'Substance Abuse', 'Eating Disorder', 'OCD (Obsessive-Compulsive Disorder)', 'Personality Disorders', 'Self-harm', 'Other'];

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mentalHealthHistory: {
        type: String,
        enum: historyOptions
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        required: true
    },
    therapyOption: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    isAdmin: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Number,
        default: 0
    },
    token: {
        type:String,
        default:''
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User