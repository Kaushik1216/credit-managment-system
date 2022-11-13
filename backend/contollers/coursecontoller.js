const course=require("../models/course")

exports.getAllcourse=async(req, res, next) => {
    try {
        console.log(req.body.user);
        const data = await course.findOne({
          rollno:"B21145"
        })
     
        const context = {
          status: "success",
          data: data.courselist,
        };
        console.log(data.courselist)
        console.log("datamil gaya")
        res.status(200).json(context);
      } catch (error) {
        console.log("datanot receive")
      }
    
};

exports.postcourse=async(req, res, next) => {
    try {
        var d= await req.body;
        console.log(d.data)
        const newdata={
          $set:{courselist:d.data}
      }
      var query={
        rollno:d.user,
      }
      const upda=await course.updateOne(query,newdata)
      console.log("docupdated")
       console.log("hellokaushik")
      } catch (error) {
        console.log("datanot receive")
      }
    }
    ;
