const uuid = require('uuid/v4');
const quizModelObj = require('../models/quiz_model');



let createQuiz = async (quiz) => {
    let quizCode = uuid();
    quiz['quizCode'] = quizCode;

    let status = await new quizModelObj.quizModel(quiz).save();
    return status;
}

let fetchFullQuiz = async (quizCode) => {
    let quiz = await quizModelObj.quizModel.findOne({'quizCode':quizCode});
    return quiz;
}

let evaluateQuiz = async(response) => {
    
    let cacheQuiz = await quizModelObj.quizModel.findOne({'quizCode':response['quizCode']});
    
    let answerMap = {};

    //create answer key 
    cacheQuiz['question'].forEach(q => {
        answerMap[String(q.questionNumber)] = {'score':q.correctScore}
        q['options'].forEach(o=>{
            if(o['isCorrect']){
                answerMap[String(q.questionNumber)]['correctKey'] = o['label']
                return false
            }
        });
    });

    //calculate score
    let questionNum = Object.keys(answerMap);
    var totalMarks = 0;
    questionNum.forEach(key=>{
        if(answerMap[key]['correctKey'] === response[key]){
            totalMarks+= answerMap[key]['score'];
        }else{
            totalMarks -= (answerMap[key]['score']/4)
        }
    })
    //save in DB 
    let score = {playerName:response['playerName'],quizCode:response['quizCode'],date:new Date(),score:totalMarks};
    await new quizModelObj['scoreModel'](score).save();
    return totalMarks;

}

let getQuizScore = async (quizCode)=>{
     let scores = await quizModelObj['scoreModel'].find({'quizCode':quizCode}).sort({'date':-1});
     return scores;
}



var controller = {}
controller['createQuiz'] = createQuiz;
controller['fetchFullQuiz'] = fetchFullQuiz;
controller['evaluateQuiz'] = evaluateQuiz;
controller['getQuizScore'] = getQuizScore;

module.exports = controller;