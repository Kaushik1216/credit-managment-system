const router = require("express").Router();
const{login}=require("../contollers/logincontoller")
const{signin}=require("../contollers/signincontriller")
const{getprofile,editprofile}=require("../contollers/profilecontroller")
const{postcourse}=require("../contollers/coursecontoller")
const {userValidationResult,userValidator}=require("../validators/registervalidator")

router.route("/").get(async (req, res) => {
  try {
    console.log(req.session.user,"login User");
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

router.route("/course").post(postcourse)
router.route("/login").post(login)
router.route("/signin").post(signin)
router.route("/profile").post(getprofile);
router.route("/editprofile").post(editprofile);


module.exports = router;