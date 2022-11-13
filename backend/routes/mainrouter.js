const router = require("express").Router();
const{login}=require("../contollers/logincontoller")
const{signin}=require("../contollers/signincontriller")
const{getAllcourse,postcourse}=require("../contollers/coursecontoller")
router.route("/").get(async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});
router.route("/course").get(getAllcourse)
router.route("/course").post(postcourse)
router.route("/login").post(login)
router.route("/signin").post(signin)


module.exports = router;