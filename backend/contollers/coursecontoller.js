const course=require("../models/course")

exports.postcourse=async(req, res) => {
    const work=await req.body.type;
    if(work==="get"){
      try {
        var d= await req.body;
        const c=req.body.user;

      
          const data = await course.findOne({
            rollno:c.slice(1,7)
          })
           const context = {
            status: "success",
            data: data.courselist,
          };
          res.status(200).json(context);
        } catch (error) {
          res.status(422).json({error:error})
        }
    }else if(work==="post"){

      try {
          var d= await req.body;
          console.log(d.user)
          const newdata={
            $set:{courselist:d.data,totalcredit:d.credit,totalcourse:d.course}
        }
        console.log(req.session)
        var query={
          rollno:d.user.slice(1,7),
        }
        const upda=await course.updateOne(query,newdata, function(err, res) {
          if (err) throw err;
        })
        } catch (error) {
          res.status(422).json({error:error})

        }
      }
    }
    ;
