const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courses = new Schema({
    rollno: { type: String, required: true },
    courselist:[
       { semester:{ type: String, required: true },
       no: { type: Number, required: true },
       courseid:{type:String,required:true},
       coursename:{type:String,required:true},
       coursetype:{type:String,required:true},
       instructor:{type:String,required:true},
       credit:{type:Number,required:true}, 
      }
    ],
});

const course = mongoose.model('Courses',loginSchema );

module.exports =course ;