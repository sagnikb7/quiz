//ex path : http://localhost:3000/quiz_public

const express = require('express');
const router = express.Router();
const fs = require('fs');
const json2xls = require('json2xls');

const controller_quiz = require('../controllers/quiz_controller');

router.get('/start/:quizCode', (req, res) => {
    controller_quiz.fetchFullQuiz(req.params.quizCode).then((quiz) => {

        res.render('quiz', {
            'data': quiz
        });
    }).catch((e) => {
        console.log(e);
    });

});


router.post('/submit', (req, res) => {
    controller_quiz.evaluateQuiz(req.body).then((data) => {
        let dataJSON = {
            'score': data,
            'quizCode': req.body.quizCode
        };
        res.render('myscore', {
            data: dataJSON
        });
    });

});

router.get('/scoreboard/:quizCode', (req, res) => {
    controller_quiz.getQuizScore(req.params.quizCode).then((data) => {
        let dataJSON = {
            'quizCode': req.params.quizCode,
            'data': data
        }
        res.render('scoreboard', {
            'data': dataJSON
        });
    }).catch((e) => {
        console.log(e);
    });
});

router.get('/report/:quizCode', (req, res) => {
    controller_quiz.getQuizScore(req.params.quizCode).then((data) => {

        let jsonArray = [];
        data.forEach(element => {
            tempJSON = {}
            tempJSON['playerName'] = element['playerName'];
            tempJSON['score'] = element['score'];
            tempJSON['date'] = element['date'];
            jsonArray.push(tempJSON);
        });
        //console.log(jsonArray);
        var xls = json2xls(jsonArray);
        fs.writeFileSync("quiz.xls", xls, 'binary');
        res.download("quiz.xls");
   
    }).catch((e) => {
        console.log(e);
    });

});

module.exports = router;