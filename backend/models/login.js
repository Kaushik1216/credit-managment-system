const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  rollno: { type: String, required: true }, 
  password: { type: String, required: true },
});

const login = mongoose.model('Logins',loginSchema );

module.exports = login;