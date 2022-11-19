const register=require("../models/signin")
const course=require("../models/course")
exports.getprofile=async(req,res)=>{
    try {
        const d=req.body;
    const userinfo= await register.findOne({rollno:(d.user.slice(0,7))})
    const courseinfo = await course.findOne({rollno:(d.user.slice(0,7))})
        context={
            status:"Success",
            data:userinfo,
            totalcredit:courseinfo.totalcredit,
            totalcourse:courseinfo.totalcourse
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
            rollno:d.user.slice(0,7),
          }
        const newdata={
            firstname:req.body.data.firstname,
            lastname:req.body.data.lastname,
            email:req.body.data.email,
            rollno:req.body.data.rollno,
            branch:req.body.data.branch,
            degree:req.body.data.degree, 
        }
        const upda=await register.updateOne(query,newdata)

    } catch (error) {
        res.status(422).send(error)    }
}