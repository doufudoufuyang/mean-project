const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") })
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.user_register = async (req, res) => {
  try {
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
      role: "customer",
    });
    res.status(201).json({ message: "successfully register" });
  } catch (e) {
    console.log("failed to register: ", e);
  }
};

exports.sent_register_invitation = async (req, res) => {
  try {
    const { name, email } = req.body;
    const payload = {
      name: name,
      email: email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    
    let account = await nodemailer.createTestAccount()
    console.log('account info: ', account)
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
      sendMail: true
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: `Register Invitation`, // Subject line
      text: `Hello ${name}, here is your register token!`, // plain text body
      html: `<b>${token}</b>`, // html body
    });

    console.log('send mail with defined transport object: ', info)
    res.status(200).json({ register_token : token })
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
    });
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
      res.status(200).json({ jwt: token });
    }
  } catch (e) {
    console.log("fail to login: ", e);
  }
};


exports.get_favorite = async (req, res) => {
  try {
    const { username, email } = req.payload
    const userFavorites = await User.findOne({
      username: username,
      email: email
    }).populate('favorites')
    const products = userFavorites.favorites.map(product => product)
    res.status(200).json({ favorites: products})
  } catch (e) {
    console.log('fail to get user favorites: ', e)
  }
}

exports.admin_overview = async (req, res) => {
  try {
    const { username, email } = req.payload
    const userFavorites = await User.find({
      username: { $ne:  username},
      email: { $ne:  email}
    }).populate('favorites')
    res.status(200).json({ all: userFavorites})
  } catch (e) {
    console.log('fail to get user favorites: ', e)
  }
}