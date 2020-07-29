const router = require("express").Router();
const {
  postCourseDetails,
  getCourseDetails,
  getCourses,
  postAndUpdateCourseDetails,
  postAndUpdateObjectives,
  getObjectives,
  postAndUpdateCO,
  getCO,
  postAndUpdatePO,
  getPO,
  postAndUpdatePSO,
  getPSO
} = require("./controller");


router.post("/postCourseDetails", postCourseDetails);
router.post("/postAndUpdateCourseDetails", postAndUpdateCourseDetails);
router.post("/postAndUpdateObjectives", postAndUpdateObjectives);
router.post("/postAndUpdateCO", postAndUpdateCO);
router.post("/postAndUpdatePO", postAndUpdatePO);
router.post("/postAndUpdatePSO", postAndUpdatePSO);


router.get("/getCourseDetails", getCourseDetails);
router.get("/getCourses", getCourses);
router.get("/getObjectives", getObjectives);
router.get("/getCO", getCO);
router.get("/getPO", getPO);
router.get("/getPSO", getPSO);


// router.post("/hey", letustry);
module.exports = router;