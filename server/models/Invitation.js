const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
    name : { type: String, required : true },
    email : { type: String, required : true },
    token : { type: String, required : true },
    status : { type : String, required : true }
})

const Invitation = mongoose.model("Invitation", InvitationSchema, "Invitation")

module.exports = Invitation