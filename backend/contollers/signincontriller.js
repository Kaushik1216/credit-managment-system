const register=require("../models/signin")
const bcrypt = require("bcryptjs");

exports.signin=async (req, res, next) => {
    try {
        const password =req.body.password;
        const cpassword =req.body.cpassword;
        if(password===cpassword){
            const hashpassord = await bcrypt.hash(password,10);
            register.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            rollno:req.body.rollno,
            branch:req.body.branch,
            degree:req.body.degree,
            password:hashpassord
            })
        }
        console.log("registers")
        res.status(200).send("registered")
    } catch (error) {
        console.log("error")
    }

};