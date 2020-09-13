const mongoose = require('mongoose');

// var CounterSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);




const IssueSchema = mongoose.Schema({
    issueno :{
        type : Number
    },
    title :{
        type : String,
        required : true
    },
    description :{
            type : String
    },

    reportdate :{
        type : String,
        required : true
    },
    reporter : {
        type: String,
        required : true
    },
    status :{
        type : String,
        required : true
    },

    assignee :{
        type:String
    },
    comments : {
        type : String,
        default: ''
    },
    attachmenturl :{
        type:String
    },
    watcher :{
        type:String
    },
    
});


// IssueSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'issueId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.issueno = counter.seq;
//         next();
//     });
// });

const Issue = module.exports = mongoose.model('Issue',IssueSchema)