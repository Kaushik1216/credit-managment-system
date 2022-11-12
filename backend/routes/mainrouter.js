const router = require("express").Router();
const register= require("../models/signin");
const login=require("../models/login")
const bcrypt = require("bcryptjs");
router.route("/").get(async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});
router.route("/login").post(async(req,res)=>{
    try {
        const roll=req.body.rollno;
        const password=req.body.password;
        const user= await register.findOne({
        rollno: roll
      });
      const hashpassord = await bcrypt.compare(password,user.password);
      if(hashpassord===true){
        console.log("correct password")
        res.status(200).send("login")
      }else{
        console.log("incorrect password")
      }
    } catch (error) {
        console.log("errorlogin")
    }
})
router.route("/signin").post(async(req,res)=>{
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
})


module.exports = router;