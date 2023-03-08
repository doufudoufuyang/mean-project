const router = require("express").Router();
const HRProfileController = require("../controllers/HRProfileController");
const { authenticateJWT } = require('../middleware/authenticate');
const { authorizationJWT } = require('../middleware/authenticate');
// profile
router.get('/profiles', HRProfileController.getAllProfiles);
router.get('/searchProfiles', HRProfileController.searchProfiles);
router.get('/visas', HRProfileController.getVisas);
router.get('/inProgressVisas', HRProfileController.getInProgressVisa);
router.get('/searchVisa', HRProfileController.getAllProfiles);
//application
router.post('/rejectApplication', HRProfileController.rejectApplication);
router.post('/approveApplication', HRProfileController.approveApplication);
//documents
router.post('/reject', HRProfileController.reject);
router.post('/approve', HRProfileController.approve);
module.exports = router;