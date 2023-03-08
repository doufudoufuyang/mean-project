const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    timestamp: { type: Date, required: true },
})

const ReportSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Open', 'InProgress', 'Closed'], required: true },
    createdBy: { type: refType, ref: 'User', required: true },
    username: { type: String, required: true },
    comments: [{ type: CommentSchema }],
})

const Report = mongoose.model('Report', ReportSchema, 'Report');

module.exports = Report;
