const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const Profile = require("../models/Profile");
const nextStep = {
  0: "submit onboarding application",
  1: "wait for HR approval",
  2: "submit OPT EAD",
  3: "wait for HR approval",
  4: "submit I-983",
  5: "wait for HR approval",
  6: "submit I-20",
  7: "wait for HR approval",
};
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    return res.status(201).json({ data: profiles });
  } catch (e) {
    console.log(e);
  }
};

exports.getInProgressVisa = async (req, res) => {
  try {
    const profiles = await Profile.find({ $or: [{ step: 0 }, { step: 2 }] });
    return res.status(201).json({ data: profiles });
  } catch (e) {
    console.log(e);
  }
};

exports.getVisas = async (req, res) => {
  try {
    const profiles = await Profile.find({
      $or: [{ step: 0 }, { step: 2 }, { step: 3 }],
    });
    return res.status(201).json({ data: profiles });
  } catch (e) {
    console.log(e);
  }
};
exports.reject = async (req, res) => {
  try {
    const pid = req.params.pid;
    const profile = await Profile.find({ id: pid });
    profile.nextStep = profile.nextStep - 1;
    profile.employment.feedback = req.params.feedback;
    profile.save();
    return res.status(201).json({ message: "reject successfully" });
  } catch (e) {
    console.log(e);
  }
};
exports.approve = async (req, res) => {
  try {
    const pid = req.params.pid;
    const profile = await Profile.find({ id: pid });
    profile.nextStep = profile.nextStep + 1;
    profile.save();
    return res.status(201).json({ message: "approve successfully" });
  } catch (e) {
    console.log(e);
  }
};

exports.searchProfiles = async (req, res) => {
  try {
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
      const query = { [key]: name };
      console.log(query);
      const profiles = await Profile.find({ [key]: name });
      return res.status(201).json({ data: profiles });
    } else return res.status(401).json({ message: "invalid page" });
  } catch (e) {
    console.log(e);
  }
};
exports.e = async (req, res) => {
  try {
    const email = req.params.email;
    const next = nextStep[req.params.nextStep];
    const profiles = await Profile.find({
      $or: [{ step: 0 }, { step: 2 }, { step: 3 }],
    });
    return res.status(201).json({ messgae: "send notification successfully" });
  } catch (e) {
    console.log(e);
  }
};

exports.sendNotification = async (req, res) => {
  const myemail = "aaronguan200@gmail.com";
  const mypassword = "dkdyvoawruuewbqb";
  try {
    const { name, email } = req.body;
    const next = nextStep[req.params.nextStep];
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: mypassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mail_configs = {
      from: myemail,
      to: email,
      subject: `Next Step`,
      text: `Hello ${name}, your last upload document was approved!`,
      html: `<p>Hello ${name}, here is your next step!</p><br/><b>${next}</b>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log("inside transporter.sendMail");
        console.log(error);
        return reject({ message: "An error has occured" });
      }
      return resolve({ message: "notification sent successfully!" });
    });
    res.status(200).json({ register_token: token });
  } catch (e) {
    console.log("fail to send notification: ", e);
    res.status(500).send({ error: "Fail to send notification" });
  }
};
