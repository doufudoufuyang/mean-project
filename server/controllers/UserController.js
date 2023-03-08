const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") })
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Profile = require("../models/Profile");
const House = require("../models/House");
const Report = require("../models/Report");
const Invitation = require("../models/Invitation")
const { s3Old } = require('../middleware/aws');
const BUCKET = process.env.BUCKET



exports.user_register = async (req, res) => {
  const header = req.headers['authorization']
  let token
  
  if (!header){
    res.status(400).json({ message :  "register token required"})
    return
  }
  token = header.split(" ")[1]
  console.log('register token: ', token)
  try {
    const invitation = await Invitation.updateOne({ token : token }, {status : 'Accept'})
    const { username, password, email } = req.body;
    const userExist = await User.findOne({
      username: username,
      email: email,
    });

    if (userExist) {
      res.status(409).json({ message: "user already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT)
    )

    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
      role: "employee",
      status: "Not Started"
    });

    res.status(201).json({ message: "successfully register" });
  } catch (e) {
    console.log("failed to register: ", e);
    res.status(500).json({ message: "fail to register" });
    return;
  }
};

exports.sent_register_invitation = async (req, res) => {
  const hostEmail = 'aaronguan200@gmail.com'
  const hostPassword = 'dkdyvoawruuewbqb'
  try {
    const { name, email } = req.body;
    const payload = {
      name: name,
      email: email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user: hostEmail,
          pass: hostPassword
      },
      tls: {
          rejectUnauthorized: false
      }
    })
    const mail_configs = {
      from: hostEmail,
      to:email,
      subject:`Register Invitation`, 
      text:`Hello ${name}, here is your register token!`,
      html: `<p>Hello ${name}, here is your register token!</p><br/>
            <a href='http://localhost:4200/register?token=${token}'>Click to register!</a>
            ` 
    }

    transporter.sendMail(mail_configs, function (error, info) {
      if(error){
          console.log('inside transporter.sendMail')
          console.log(error)
          return reject({message: 'Fail to send invitation link'})
      }
      return resolve({message:'Email sent successfully!'})
    })
    const invitation = await Invitation.create({
      name: name,
      email : email,
      token : token,
      status : 'Pending'
      
    })
    console.log('Invitation details: ', invitation)
    res.status(200).json({ message : 'Invitation sent' })
  } catch (e) {
    console.log('fail to send invitation: ', e)
    res.status(500).send({error : 'Fail to send invitation'})
  }
}

exports.user_login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      username: username,
      email: email,
    }).populate('profile')
    if (!user) {
      res.status(401).json({ message: "user not exists, check username and password" });
      return;
    } else {
      if (username !== user.username) {
        res.status(401).json({ message: "wrong username" });
        return;
      } else if (email !== user.email) {
        res.status(401).json({ message: "wrong email" });
        return;
      } else if (!(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ message: "wrong password" });
        return;
      }
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30m",
      });
      res.status(200).json({ jwt: token, user : user });
    }
  } catch (e) {
    console.log("fail to login: ", e);
  }
};

// Housing
// Employee get house details
exports.get_house = async (req, res) => {
  try {
    const { email, role } = req.payload;
    if (role === 'HR') return res.status(403).json({ message: "Not authorized" });
    const employee = await User.findOne({ email: email });
    const profile = await Profile.findById(employee.profile);
    const house = await House.findById(profile.house).populate('residents').populate('reports');
    if (!house) return res.status(200).json({ message: "House hasn't been assigned by HR" })
    const houseInfo = {
      address: house.address,
      roommates: house.residents.filter(user => user.email !== email),
      reports: house.reports.filter(report => report.createdBy.equals(employee.id)),
    };
    res.status(200).json({ house: houseInfo });
  } catch (err) {
    console.log(err);
  }
}

// Employee post new facility report
exports.post_report = async (req, res) => {
  try {
    const { email, role } = req.payload;
    if (role === 'HR') return res.status(403).json({ message: "Not authorized" });
    const { title, description } = req.body;
    const employee = await User.findOne({ email: email });
    const profile = await Profile.findById(employee.profile);
    const report = {
      title,
      description,
      date: Date.now(),
      status: 'Open',
      createdBy: employee.id,
    }
    const createdReport = await Report.create(report);
    const house = await House.findById(profile.house);
    await House.findByIdAndUpdate(house, { reports: [...house.reports, createdReport] }, { new: true });
    res.status(200).json({ report: createdReport });
  } catch (err) {
    console.log(err);
  }
}

// Employee view existing reports
exports.get_reports = async (req, res) => {
  try {
    const { email, role } = req.payload;
    if (role === 'HR') return res.status(403).json({ message: "Not authorized" });
    const employee = await User.findOne({ email: email });
    const profile = await Profile.findById(employee.profile);
    const house = await House.findById(profile.house).populate('residents').populate('reports');
    // console.log(house);
    const reports = house.reports.filter(report => report.createdBy.equals(employee.id));
    res.status(200).json({ reports });
  } catch (err) {
    console.log(err);
  }
}

// Employee get certain report's details
exports.get_report = async (req, res) => {
  try {
    const { email, role } = req.payload;
    if (role === 'HR') return res.status(403).json({ message: "Not authorized" });
    const { id } = req.params;
    const employee = await User.findOne({ email: email });
    const report = await Report.findById(id);
    if (!report.createdBy.equals(employee.id)) return res.status(403).json({ message: "Not authorized" });
    res.status(200).json({ report });
  } catch (err) {
    console.log(err);
  }
}

// Employee or HR add comments of facility report, HR close a facility report
exports.put_report = async (req, res) => {
  try {
    const { email, role } = req.payload;
    const user = await User.findOne({ email: email });
    const profile = await  Profile.findById(user.profile);
    const { id, description, status } = req.body;
    if (!id) res.status(400).json({ message: "Report ID is required" });
    const report = await Report.findById(id);
    let updatedReport = report;
    if (role === 'HR' && status) { // HR close a facility report
      updatedReport = await Report.findByIdAndUpdate(report, { status: status }, { new: true });
    } else { // add comment
      const comment = {
        description,
        createdBy: profile ? (profile.firstName + ' ' + profile.lastName) : 'HR',
        timestamp: Date.now(),
      }
      updatedReport = await Report.findByIdAndUpdate(report, { comments: [...report.comments, comment] }, { new: true });
      if (role === 'HR' && report.status === 'Open') {
        updatedReport = await Report.findByIdAndUpdate(report, { status: 'InProgress' }, { new: true });
      }
    }
    res.status(200).json({ report: updatedReport });
  } catch (err) {
    console.log(err);
  }
}

// HR view all houses
exports.get_houses = async (req, res) => {
  try {
    const { role } = req.payload;
    if (role === 'empoyee') return res.status(403).json({ message: "Not authorized" });
    const houses = await House.find();
    res.status(200).json({ houses });
  } catch (err) {
    console.log(err);
  }
}

// HR view certain house details
exports.get_house_with_id = async (req, res) => {
  try {
    const { role } = req.payload;
    if (role === 'empoyee') return res.status(403).json({ message: "Not authorized" });
    const { id } = req.params;
    const house = await House.findById(id).populate('residents').populate('reports');
    return res.status(200).json({ house });
  } catch (err) {
    console.log(err);
  }
}

// HR add new house
exports.post_house = async (req, res) => {
  try {
    const { role } = req.payload;
    if (role === 'empoyee') return res.status(403).json({ message: "Not authorized" });
    const { address, landlord, facilityInfo } = req.body;
    const house = { address, landlord, facilityInfo };
    const createdHouse = await House.create(house);
    res.status(200).json({ house: createdHouse });
  } catch (err) {
    console.log(err);
  }
}

// HR edit house info
exports.put_house = async (req, res) => {
  try {
    const { role } = req.payload;
    if (role === 'empoyee') return res.status(403).json({ message: "Not authorized" });
    const { id, address, landlord, facilityInfo, resident } = req.body;
    if (!id) res.status(400).json({ message: "House ID is required" });
    const house = await House.findById(id);
    const update = {};
    address && (update.address = address);
    landlord && (update.landlord = landlord);
    facilityInfo && (update.facilityInfo = facilityInfo);
    if (resident) {
      const employee = await User.findById(resident);
      const profile = await Profile.findById(employee.profile);
      if (profile.house) return res.status(409).json({ message: "Employee already been assigned a house" });
      update.residents = [...house.residents, employee.id];
    }
    const updatedHouse = await House.findByIdAndUpdate(house, update, { new: true }).populate('residents').populate('reports');
    res.status(200).json({ house: updatedHouse });
  } catch (err) {
    console.log(err);
  }
}

// HR delete house
exports.delete_house = async (req, res) => {
  try {
    const { role } = req.payload;
    if (role === 'empoyee') return res.status(403).json({ message: "Not authorized" });
    const { id } = req.params;
    const house = await House.findById(id).populate('residents');
    // console.log(house)
    house.residents.forEach(async (resident) => {
      const employee = await User.findById(resident);
      await Profile.findByIdAndUpdate(employee.profile, { $unset: { house: 1 } }, { new: true });
    });
    await Report.deleteMany({ id: { $in: house.reports } });
    await House.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully delete house"});
  } catch (err) {
    console.log(err);
  }
}

//AWS s3, unload a file
exports.user_upload = async function (req, res) {
  res.send('Successfully uploaded ' + req.file.location + ' location!')
}

//AWS s3, download a file
exports.download_file = async (req, res) => {
  const filename = req.params.filename
  let x = await s3Old.getObject({ Bucket: BUCKET, Key: filename }).promise();
  res.send(x.Body)
}

//AWS s3, list all files
exports.get_fileList = async (req, res) => {
  let r = await s3Old.listObjectsV2({ Bucket: BUCKET }).promise();
  let x = r.Contents.map(item => item.Key);
  res.send(x)
}