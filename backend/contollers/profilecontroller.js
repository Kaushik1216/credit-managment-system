const register=require("../models/signin")

exports.getprofile=async(req,res)=>{
    try {
        const d=req.body;
    const userinfo= await register.findOne({rollno:(d.user.slice(0,7))})
        context={
            status:"Success",
            data:userinfo
        }
        res.status(200).send(context)
        
    } catch (error) {
        res.status(422).send({error:err})
    }
}

exports.editprofile=async(req,res)=>{
    try {
        const d=req.body;
        var query={
            rollno:d.user.slice(1,7),
          }
        const newdata={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            rollno:req.body.rollno,
            branch:req.body.branch,
            degree:req.body.degree, 
        }
        const upda=await register.updateOne(query,newdata, function(err, res) {
            if (err) throw err;
            console.log("1 profile updated");
          })

    } catch (error) {
        
    }
}