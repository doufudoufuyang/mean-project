const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");

exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find();
  return res.status(201).json({ data: profiles });
};

exports.searchProfiles = async (req, res) => {
  const name = req.query.name;
  const key = req.query.key;
//   const query = {
//     $or: [
//       { firstName: name },
//       { lastName: name },
//     ],
//   };
  const profiles = await Profile.find({key:req.query.name});
  return res.status(201).json({ data: profiles });
};
