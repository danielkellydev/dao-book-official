const express = require("express");
const sessionController = require("../controllers/sessionController");
const {
  mustBePrac,
  mustBePracOrPatient,
  verifyPractitionerOwnership,
} = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/sessions", sessionController.getSessions);
router.post("/session", mustBePrac, sessionController.createSession);
router.get("/sessions/prac/:pracId", sessionController.getSessionsByPracId);
router.get(
  "/sessions/patient/:patientId",
  mustBePracOrPatient,
  sessionController.getSessionsByPatientId
);
router.get(
  "/session/patient/:sessionId",
  mustBePracOrPatient,
  sessionController.getSession
);
router.get("/session/:sessionId", mustBePrac, sessionController.getSession);
router.put(
  "/session/:sessionId",
  mustBePrac,
  verifyPractitionerOwnership,
  sessionController.updateSession
);
router.delete("/session/:sessionId", sessionController.deleteSession);
module.exports = router;
