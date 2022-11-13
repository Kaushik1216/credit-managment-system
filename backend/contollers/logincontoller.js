const register=require("../models/signin")
const bcrypt = require("bcryptjs");
exports.login=async (req, res, next) => {
    try {
        const roll=req.body.rollno;
       const password=req.body.password;
       const user= await register.findOne({
       rollno: roll
     });
     const hashpassord = await bcrypt.compare(password,user.password);
     if(hashpassord===true){
       console.log("correct password")
       const context={
         status:"success",
         data:{
           rollno:roll,
           message:"Login Successfully"
         }
       }
       res.status(200).send(context)
     }else{
       console.log("incorrect password")
     }
   } catch (error) {
       console.log("errorlogin")
   }
};