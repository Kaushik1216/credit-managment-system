const course=require("../models/course")

exports.getAllcourse=async(req, res, next) => {
    try {
      var d= await req.body;
        console.log(d.user);
        const data = await course.findOne({
          rollno:(d.user.slice(1,7))
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
    const work=await req.body.type;
    console.log(work)
    if(work==="get"){
      try {
        var d= await req.body;
        const c=req.body.user;
        console.log(typeof(c))
        console.log("c",c.slice(1,7))
          // console.log(d.user,"metonjkb");
          console.log(req.session.user,"In course page")

      
          const data = await course.findOne({
            rollno:c.slice(1,7)
          })
          
       console.log(data)
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
    }else if(work==="post"){

      try {
          var d= await req.body;
          console.log(d.user.slice(1,7),"current user")
          // console.log(d.data)
          console.log(d.user)
          const newdata={
            $set:{courselist:d.data}
        }
        console.log(req.session)
        var query={
          rollno:d.user.slice(1,7),
        }
        const upda=await course.updateOne(query,newdata, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        })
        console.log(upda)
        } catch (error) {
          console.log("datanot at post  receive")
        }
      }
    }
    ;
