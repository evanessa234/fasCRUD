const router = require("express").Router();
const {
  postCourseDetails,
  getCourseDetails
} = require("./controller");


router.post("/postCourseDetails", postCourseDetails);
router.get("/getCourseDetails", getCourseDetails);

module.exports = router;