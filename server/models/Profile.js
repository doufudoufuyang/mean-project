const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const carSchema = new Schema({
  model: String,
  make: String,
  color: String
});

const AddressSchema = new Schema({
  apt: String,
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
})

const employmentSchema = new Schema({
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
  nextStep : Number,
  step: { type: Number, required: true },
  //0:not start
  //1:non-visa
  //2:visa-in progress
  //3:visa-all done
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: String,
  preferredName: String,
  pic: String,
  driverLicense: LicenseSchema,
  address: { type: AddressSchema, required: true },
  cellPhoneNumber: { type: String, required: true },
  workPhoneNumber: String,
  car: carSchema,
  SSN: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: String,
  reference: contactSchema,
  emergencyContacts: { type: [contactSchema], required: true },
  employment: employmentSchema,
  house: { type: refType, ref: 'House' },
});

const Profile = mongoose.model("Profile", ProfileSchema, "Profile");

module.exports = Profile;
