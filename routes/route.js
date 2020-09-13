const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Issue = require('../models/issue');

const { request, response } = require('express');

//retreiving users
router.get('/userlist',(request,response,next)=>{
    // response.send('Retreive the user list data');
    User.find(function(err,users){
        response.json(users);
    })
});

router.get('/getemails',(request,response,next)=>{

    // var query = dbSchemas.SomeValue.find({}).select('email');
    var query = User.find({}).select('email');
    query.exec(function (err, emails) {
        if (err) return next(err);
        response.json(emails);
    });

});



router.post('/getuser',(request,response,next)=>{

    var email =  request.body.email;

    User.find({'email':email},function(err,user){
        response.json(user);
    });

});

//add user
router.post('/adduser',(request,response,next)=>{
    let newuser = new User({
        name : request.body.name,
        email : request.body.email,
        password : request.body.password
    });
    newuser.save((err,user)=>{
            if(err){
                response.json({msg:'failed to add user'});
            }else{
                response.json({msg:'user added successfully'});
            }
    });
});

router.delete('/deleteuser/:id',(request,response,next)=>{
    console.log('delete method called');
    User.remove({_id:request.params.id},function(err,result){
        if(err)
        {
            response.json(err);
        }else{
            response.json(result);
        }

    });
});

//retreiving issues to view
router.get('/issuelist',(request,response,next)=>{
    // response.send('Retreive the user list data');
    Issue.find(function(err,issues){
        response.json(issues);
    })
});

//add new issue
router.post('/addissue',(request,response,next)=>{
    let newissue = new Issue({
        title : request.body.title,
        description : request.body.description,
        reportdate : request.body.reportdate,
        reporter : request.body.reporter,
        assignee : request.body.assignee,
        status : request.body.status
    });
    newissue.save((err,user)=>{
            if(err){
            
                response.json({msg:'failed to add issue'});
            }else{
                console.log('issue added');
                response.json({msg:'issue added successfully'});
            }
    });
});

router.post('/getassigned',(request,response,next)=>{


    var email =  request.body.email;

    console.log(email);

    Issue.find({'assignee':email},function(err,user){
        response.json(user);
    });

});


router.post('/getissue',(request,response,next)=>{

    var id =  request.body.id;
    console.log(id);
    Issue.find({'_id':id},function(err,user){
        response.json(user);
    });

});

router.post('/updateissue/:id',(request,response,next)=>{

    // var id =  request.body.id;
    console.log('update :'+request.params.id);
    console.log('comments:'+request.body.comments);
    console.log('status:'+request.body.status);
    Issue.findOneAndUpdate({_id:request.params.id},{$set : request.body},function(err,result){
        if(err)
        {
            response.json(err);
        }else{
            Issue.find({'_id':request.params.id},function(err,user){
                response.json(user);
            });
            // response.json(result);
        }
    });

  

});



router.delete('/deletissue/:id',(request,response,next)=>{
    console.log('delete method called');
    Issue.remove({_id:request.params.id},function(err,result){
        if(err)
        {
            response.json(err);
        }else{
            response.json(result);
        }

    });
});

module.exports = router
