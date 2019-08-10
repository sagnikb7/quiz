const mongoose = require('mongoose');

const quizModelObj = {};

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quizCode: {
        type: String,
        required: true
    },
    question: {
        type: Array
    }
});


const scoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    quizCode: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    score: {
        type: Number,
        required: true
    }
});


quizModelObj['quizModel'] = mongoose.model('quiz', quizSchema, 'quiz');
quizModelObj['scoreModel'] = mongoose.model('score', scoreSchema, 'score');

module.exports = quizModelObj;