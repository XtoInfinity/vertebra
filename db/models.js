const { Schema, model } = require('mongoose');

let InstanceSchema = Schema({
    name: { type: String, required: [true, 'User Name is mandatory'] },
    profileLink: { type: String, unique: true },
    location: { type: String },
    education: { type: String },
    chalengeSolved: { type: Number },
    solutionSubmitted: { type: Number },
    solutionAccepted: { type: Number },
    overallRank: { type: Number },
    followers: { type: Number },
    following: { type: Number },
    vote: { type: Number },
    deviceType: { type: String },
    updated: { type: Date, default: Date.now() }
});

let InstanceModel = model('instance', InstanceSchema);

module.exports = {
    InstanceModel
};