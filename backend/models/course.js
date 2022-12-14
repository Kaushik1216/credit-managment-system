
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    rollno: { type: String, required: true },
    courselist:[
       { 
       semester:{ type: String, required: true },
       no: { type: String, required: true },
       courseid:{type:String,required:true},
       coursename:{type:String,required:true},
       coursetype:{type:String,required:true},
       instructor:{type:String,required:true},
       credit:{type:Number,default:0}, 
      }
    ],
    totalcourse:{type:Number,default:0},
    totalcredit:{type:Number,default:0}

});

const course = mongoose.model('Courses',coursesSchema);

module.exports =course ;