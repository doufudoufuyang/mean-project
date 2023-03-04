const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { authenticateJWT } = require('../middleware/authenticate')
const { authorizationJWT } = require('../middleware/authenticate')

router.post('/register', UserController.user_register)
router.post('/login', UserController.user_login)
router.get('/favorite', authenticateJWT, UserController.get_favorite)
router.get('/all', authorizationJWT, UserController.admin_overview)
router.post('/sendInvitation', UserController.sent_register_invitation)

module.exports = router