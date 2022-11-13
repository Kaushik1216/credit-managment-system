const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    rollno: { type: String, required: true },
    courselist:[
       { semester:{ type: Number, required: true },
       key:{ type: Number, required: true} ,
       no: { type: Number, required: true },
       courseid:{type:String,required:true},
       coursename:{type:String,required:true},
       coursetype:{type:String,required:true},
       instructor:{type:String,required:true},
       credit:{type:Number,required:true}, 
      }
    ],
});

const course = mongoose.model('Courses',coursesSchema);

module.exports =course ;