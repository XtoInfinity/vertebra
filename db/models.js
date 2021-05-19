const { Schema, model } = require('mongoose');

let UserSchema = Schema({
    appId: { type: String, },
    role: { type: String, },
    appId: { type: String, },
    username: { type: String },
    password: { type: String }
});

let BugSchema = Schema({
    userId: { type: Schema.Types.ObjectId, required: [true, 'User Id is mandatory'] },
    appId: { type: String, required: [true, 'App Id is mandataory'] },
    category: { type: String },
    description: { type: String },
    status: { type: String, default: "open" },
    screenshot: { type: String },
    updated: { type: Date, default: Date.now() }
});

let MessageSchema = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    message: { type: String },
    timestamp: { type: Date, default: Date.now() }
})

let AnnouncementSchema = Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    timestamp: { type: Date, default: Date.now() }
})

// Register models in mongodb
let BugModel = model('bug', BugSchema);
let UserModel = model('user', UserSchema);
let MessageModel = model('message', MessageSchema);
let AnnouncementModel = model('announcement', AnnouncementSchema);

module.exports = {
    BugModel,
    UserModel,
    MessageModel,
    AnnouncementModel
};