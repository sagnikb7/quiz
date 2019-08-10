const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;


//DB connections
let localDB = "mongodb://localhost:27017/lets_Endorse";
let remoteDB = "mongodb://sagnik:Aquafox59$@ds159812.mlab.com:59812/planme-prod";
mongoose.connect(remoteDB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("MongoDB connected");
    }).catch(() => {
        console.log("MongoDB error");
    });
const model_quiz = require('./models/quiz_model');

//template engine and middlewares
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



//Routes
const Route_quizAdmin = require('./routes/quiz_admin_route');
const Route_quizCommon = require('./routes/quiz_common_route');

app.use('/quiz', Route_quizAdmin);
app.use('/quiz_public', Route_quizCommon);



app.get('/', (req, res) => {
    model_quiz.quizModel.find().then((data)=>{
        res.render("landing",{"quiz":data});
    }).catch((e)=>{
        console.log(e);
    });
   
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});