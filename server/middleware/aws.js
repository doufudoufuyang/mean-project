const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const aws = require('aws-sdk')
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

aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,
  });
const s3Old = new aws.S3();

module.exports = { upload, s3Old }