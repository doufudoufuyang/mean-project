const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
const jwt = require("jsonwebtoken");

mongoose.connect(MONGO_URL, (error) => {
  if (error) console.log(error);
  else {
    console.log("Connected to DB.");
    const payload = {
      username: 'employee1',
      email: 'employee1@gmail.com',
      role: 'employee',
    };
    const employeeToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "120m" });
    console.log(employeeToken);
    const hrPayload = {
      username: 'hr1',
      email: 'hr1@gmail.com',
      role: 'HR',
    };
    const hrToken = jwt.sign(hrPayload, process.env.JWT_SECRET, { expiresIn: "120m" });
    console.log(hrToken);
  }
});

module.exports = mongoose.connection;
