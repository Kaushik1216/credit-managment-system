const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  rollno: { type: String, required: true }, 
  email: { type: String, required: true }, 
  branch: { type: String, required: true },
  // school: { type: String, required: true },
  degree: { type: String, required: true },
  password: { type: String, required: true },
});

const Register = mongoose.model('Registers',registerSchema );

module.exports = Register;