//importing modules

var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors')
var path = require('path')
// const { request } = require('http')
// const { response } = require('express')

var app = express();

const route = require('./routes/route')

mongoose.set('useFindAndModify', false);
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/userlist');
//on connection
mongoose.connection.on('connected',()=>{
    console.log('connected to db engine');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in db connection'+err);
    }
});

const port = 3000;

app.use(cors());

app.use(bodyparser.json());

app.use('/api',route);

app.use(express.static(path.join(__dirname,'public')));

//routes
// app.use('/api',routes);
// app.use(app.router);
// routes.initialize(app);

//testing server
app.get('/',(request,response)=>{
    response.send('Track App Started');
});

app.listen(port,()=>{
    console.log('Server Started at port'+port);
});

