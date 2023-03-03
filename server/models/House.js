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

const CommentSchema = new Schema({
    description: { type: String, required: true },
    createdBy: { type: refType, ref: 'User', required: true },
    timestamp: { type: Date, required: true },
})

const ReportSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Open', 'In Progress', 'Closed'], required: true },
    description: { type: String, required: true },
    createdBy: { type: refType, ref: 'User', required: true },
    comments: [{ type: CommentSchema }],
})

const HouseSchema = new Schema({
    address: { type: AddressSchema, required: true },
    landlord: { type: LandlordSchema, required: true },
    residents: [{ type: refType, ref: 'User'}],
    bedNum: { type: Number, default: 0, required: true },
    mattressNum: { type: Number, default: 0, required: true },
    tableNum: { type: Number, default: 0, required: true },
    chairNum: { type: Number, default: 0, required: true },
    reports: [{ type: ReportSchema }],
})

const House = mongoose.model('House', HouseSchema, 'House');

module.exports = House;
