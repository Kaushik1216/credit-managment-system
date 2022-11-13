const course=require("../models/course")

exports.getAllcourse=async(req, res, next) => {
    try {
        console.log(req.body.user);
        const data = await course.findOne({
          rollno:req.body.user
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
        function file(item){
          delete  item.key;
          item["semester"]=1;
        } 
        await d.forEach(file);
        console.log(d);
        const newdata={
          $set:{courselist:d}
      }
      var query={
        rollno:"B21145",
      }
      const upda=await course.updateOne(query,newdata)
      console.log("docupdated")
       console.log("hellokaushik")
      } catch (error) {
        console.log("datanot receive")
      }
    }
    ;
