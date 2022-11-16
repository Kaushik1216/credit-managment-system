const mongoose = require("mongoose");
const jwt =require('jsonwebtoken')
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
const registerSchema = new Schema({
  firstname: { type: String, 
    required: true,
    minlength:3,
    maxlength:20,
    trim:true
   },
  lastname: { type: String, required: true
    ,
    minlength:3,
    maxlength:20,
    trim:true },
  rollno: { type: String, required: true,trim:true,unique:true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  // school: { type: String, required: true },
  degree: { type: String, required: true },
  password: { type: String, required: true,trim:true,minlength:5 },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
});

const Register = mongoose.model("Registers", registerSchema);

registerSchema.methods.generateAuthToken = async function(){
  try {
    let token =jwt.sign({_id:this._id},process.env.SECRET);
    this.tokens=this.token.concat({token:token})
    await this.save();
    return token;
  } catch (error) {
    console.log(err);
  }
}


module.exports = Register;
