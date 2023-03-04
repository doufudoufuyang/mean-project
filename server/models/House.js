const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const AddressSchema = new Schema({
    apt: String,
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
})

const LandlordSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
})

const FacilityInfoSchema = new Schema({
    bedNum: { type: Number, default: 0, required: true },
    mattressNum: { type: Number, default: 0, required: true },
    tableNum: { type: Number, default: 0, required: true },
    chairNum: { type: Number, default: 0, required: true },
})

const HouseSchema = new Schema({
    address: { type: AddressSchema, required: true },
    landlord: { type: LandlordSchema, required: true },
    residents: [{ type: refType, ref: 'User'}],
    facilityInfo: { type: FacilityInfoSchema, required: true },
    reports: [{ type: refType, ref: 'Report' }],
})

const House = mongoose.model('House', HouseSchema, 'House');

module.exports = House;
