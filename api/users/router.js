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
  getPSO,
  postAndUpdateDqaTeamFeedback,
  getDqaTeamFeedback,
  updateHodFeedback,
  getHodFeedback,
  postAndUpdateCO_PO_Mapping,
  getCO_PO_Mapping,
  postAndUpdateCO_PSO_Mapping,
  getCO_PSO_Mapping,
  postAndUpdateAssessmentMethod,
  getAssessmentMethod
} = require("./controller");


router.post("/postCourseDetails", postCourseDetails);
router.post("/postAndUpdateCourseDetails", postAndUpdateCourseDetails);
router.post("/postAndUpdateObjectives", postAndUpdateObjectives);
router.post("/postAndUpdateCO", postAndUpdateCO);
router.post("/postAndUpdatePO", postAndUpdatePO);
router.post("/postAndUpdatePSO", postAndUpdatePSO);
router.post("/postAndUpdateDqaTeamFeedback", postAndUpdateDqaTeamFeedback);
router.put("/updateHodFeedback", updateHodFeedback);
router.post("/postAndUpdateCO_PO_Mapping", postAndUpdateCO_PO_Mapping);
router.post("/postAndUpdateCO_PSO_Mapping", postAndUpdateCO_PSO_Mapping);
router.post("/postAndUpdateAssessmentMethod", postAndUpdateAssessmentMethod);


router.get("/getCourseDetails", getCourseDetails);
router.get("/getCourses", getCourses);
router.get("/getObjectives", getObjectives);
router.get("/getCO", getCO);
router.get("/getDqaTeamFeedback", getDqaTeamFeedback);
router.get("/getPSO", getPSO);
router.get("/getHodFeedback", getHodFeedback);
router.get("/getCO_PO_Mapping", getCO_PO_Mapping);
router.get("/getCO_PSO_Mapping", getCO_PSO_Mapping);
router.get("/getAssessmentMethod", getAssessmentMethod);


module.exports = router;