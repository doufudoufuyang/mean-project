const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") })
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
<<<<<<< Updated upstream
    console.log('fail to get user favorites: ', e)
=======
    console.log("failed to update profile: ", e);
>>>>>>> Stashed changes
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