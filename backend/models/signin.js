const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  firstname: {
    type: String,required: true,
    minlength: 3,maxlength: 20,trim: true,
  },
  lastname: {type: String, required: true,
    minlength: 3,maxlength: 20,trim: true,
  },
  rollno: { type: String, required: true, 
    trim: true, unique: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  degree: { type: String, required: true },
  password: { type: String, required: true, 
    trim: true, minlength: 5 },
});

const Register = mongoose.model("Registers", registerSchema);

module.exports = Register;
