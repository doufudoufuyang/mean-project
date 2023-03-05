const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const Profile = require("../models/Profile");
const feedback = {
  0:"submit onboarding application",
  1:"wait for HR approval",
  2:"submit OPT EAD",
  3:"wait for HR approval",
  4:"submit I-983",
  5:"wait for HR approval",
  6:"submit I-20",
  7:"wait for HR approval",
}
exports.getAllProfiles = async (req, res) => {
  const profiles = await Profile.find();
  return res.status(201).json({ data: profiles });
};
exports.getInProgressVisa = async (req, res) => {
  
  const profiles = await Profile.find({ step: 1 });
  
};
exports.getVisas = async (req, res) => {
  
  const profiles = await Profile.find({ step:2  });
  
};
exports.updateInProgressVisa = async (req, res) => {};

exports.searchProfiles = async (req, res) => {
  const name = req.query.name;
  const key = req.query.key;
  if (key && name) {
    //   const query = {
    //     $or: [
    //       { firstName: name },
    //       { lastName: name },
    //     ],
    //   };
    console.log(key);
    const query = {[key]:name};
    console.log(query);
    const profiles = await Profile.find({[key]:name});
    return res.status(201).json({ data: profiles });
  } else return res.status(401).json({ message: "invalid page" });
};
