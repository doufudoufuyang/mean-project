const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
const carSchema = new Schema({ model: String, make: String, color: String });
const employmentSchema = new Schema({
  step: { type: Number, required: true },
  feedback: { type: String },
  optReceipt: { type: String },
  optEAD: { type: String },
  i20: { type: String },
  i983: { type: String },
  title: String,
  startDate: String,
  endDate: String,
});

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: String,
  phone: { type: String, required: true },
  email: { type: String, required: true },
  relationship: { type: String, required: true },
});
const LicenseSchema = new Schema({
  number: { type: String, required: true },
  expireDate: { type: String, required: true },
  document: { type: String, required: true },
});
const ProfileSchema = new Schema({
  feedback: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: String,
  preferredName: String,
  pic: String,
  driverLicense: LicenseSchema,
  address: { type: String, required: true },
  cellPhoneNumber: { type: String, required: true },
  workPhoneNumber: String,
  car: carSchema,
  SSN: { type: String, required: true },
  dateOfBirth: { type: Timestamp, required: true },
  gender: String,
  reference: contactSchema,
  emergencyContacts: { type: [contactSchema], required: true },
  employment: employmentSchema,
});

const Profile = mongoose.model("Profile", ProfileSchema, "Profile");

module.exports = Profile;
