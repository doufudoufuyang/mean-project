const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:  { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['HR', 'employee'], required: true },
  status: { type: String, enum: ['Not Started', 'Pending', 'Approved', 'Rejected'] },
  profile: { type: refType, ref: 'Profile' },
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;
