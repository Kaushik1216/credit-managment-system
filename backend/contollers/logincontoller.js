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
      //  const token = user.generateAuthToken();
      //  res.cookie("jwttoken",token,{
      //   expires:new Date(Data.now()+30000),
      //   httpOnly:true
      //  })
      //  req.session.user=roll;
       res.status(200).send(context)
     }else{
       res.status(422).send({
        message:"incorrect password"
       })
     }
   } catch (error) {
    res.status(422).send({
      message:"incorrect password"
     })
   }
};