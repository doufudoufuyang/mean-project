const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { authenticateJWT } = require('../middleware/authenticate');
const { authorizationJWT } = require('../middleware/authenticate');
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer')
const multerS3 = require('multer-s3');
const BUCKET = process.env.BUCKET

let s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey:  process.env.ACCESS_SECRET,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });
const upload = multer({
    storage: multerS3({
        s3: s3,
        // acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log('file=', file);
            cb(null, file.originalname)
        }
    })
})

router.post('/register', UserController.user_register)
router.post('/login', UserController.user_login)
router.get('/favorite', authenticateJWT, UserController.get_favorite)
router.get('/all', authorizationJWT, UserController.admin_overview)
router.post('/sendInvitation', UserController.sent_register_invitation)

// Housing
// Employee & HR add or update comments
router.put('/report', authorizationJWT, UserController.put_report);
// Employee
router.get('/house', authorizationJWT, UserController.get_house);
router.post('/report', authorizationJWT, UserController.post_report);
router.get('/reports', authorizationJWT, UserController.get_reports);
router.get('/report/:id', authorizationJWT, UserController.get_report);
// HR
router.get('/houses', authorizationJWT, UserController.get_houses);
router.get('/house/:id', authorizationJWT, UserController.get_house_with_id);
router.post('/house', authorizationJWT, UserController.post_house);
router.put('/house', authorizationJWT, UserController.put_house);
router.delete('/house/:id', authorizationJWT, UserController.delete_house);

//AWS s3, unload a file, download a file, list all files
router.post('/upload', upload.single('file'), UserController.user_upload)
router.get("/download/:filename", UserController.download_file)
router.get("/list", UserController.get_fileList)

module.exports = router;
