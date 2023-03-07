const path = require("path");
require('dotenv').config(path.join(__dirname, '../../.env'));
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;
const User = require("../models/User");
const Profile = require("../models/Profile");
const House = require("../models/House");
const Report = require("../models/Report");
const { report1, house1, profile1, employee1, hr1 } = require("./sampledata");

async function run() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB.");

    // await Promise.all([User.collection.drop(), Profile.collection.drop(), House.collection.drop(), Report.collection.drop()]);

    await User.create(hr1);
    const employee = await User.create(employee1);
    const profile = await Profile.create(profile1);
    const house = await House.create(house1);
    const report = await Report.create(report1);
    await User.findByIdAndUpdate(employee, { profile: profile }, { new: true });
    await Profile.findByIdAndUpdate(profile, { house: house }, { new: true });
    await House.findByIdAndUpdate(house, { residents: [...house.residents, employee], reports: [...house.reports, report] }, { new: true });
    await Report.findByIdAndUpdate(report, { createdBy: employee }, { new: true });
  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);
