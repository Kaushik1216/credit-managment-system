const {check,validationResult}=require('express-validator')

const userValidationResult=(req,res,next)=>{
    const result =validationResult(req)
    if(!result.isEmpty()){
        const error=result.array()[0].msg;
        return res.status(422).json({success:false,error:error})
    }
    next();
}
exports.userValidator=[
check('firstname')
.trim()
.not()
.isEmpty()
.isLength({min:8,max:15})
.withMessage('First name is required')
]