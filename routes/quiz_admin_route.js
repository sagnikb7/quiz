//ex path : http://localhost:3000/quiz

const express = require('express');
const router = express.Router();

const controller_quiz = require('../controllers/quiz_controller');

let sampleQuiz1 = {
    name: 'Quiz 1 ',
    question: [{
            question: 'What is the color of water?',
            questionNumber: 1,
            correctScore: 2,
            options: [{
                label: 'A',
                isCorrect: true,
                text: 'Blue',
                group: 1
            }, {
                label: 'B',
                isCorrect: false,
                text: 'Green',
                group: 1
            }, {
                label: 'C',
                isCorrect: false,
                text: 'Yellow',
                group: 1
            }, {
                label: 'D',
                isCorrect: false,
                text: 'Red',
                group: 1
            }]
        },
        {
            question: 'What is the national animal of India?',
            correctScore: 5,
            questionNumber: 2,
            options: [{
                label: 'A',
                isCorrect: false,
                text: 'Rabbit',
                group: 2
            }, {
                label: 'B',
                isCorrect: true,
                text: 'Tiger',
                group: 2
            }, {
                label: 'C',
                isCorrect: false,
                text: 'Cow',
                group: 2
            }, {
                label: 'D',
                isCorrect: false,
                text: 'Goat',
                group: 2
            }]
        },
        {
            question: 'What is the formula of common salt?',
            questionNumber: 3,
            correctScore: 3,
            options: [{
                label: 'A',
                isCorrect: true,
                text: 'H2O',
                group: 3
            }, {
                label: 'B',
                isCorrect: false,
                text: 'O',
                group: 3
            }, {
                label: 'C',
                isCorrect: false,
                text: 'HCL',
                group: 3
            }, {
                label: 'D',
                isCorrect: true,
                text: 'NaCl',
                group: 3
            }]
        },





    ]
}



router.post('/createQuiz', (req, res) => {

    controller_quiz.createQuiz(sampleQuiz1).then((status)=>{
        res.send(status);
    });

});



module.exports = router;