let { BugModel, UserModel, MessageModel } = require('./models');

createUser = async (userInstance) => {
    let newUserInstance = new UserModel(userInstance);

    await newUserInstance.save();
}

createBug = async (bugInstance) => {
    let newBugInstance = new BugModel(bugInstance);

    await newBugInstance.save();
}

fetchBugsForApp = async (appId) => {
    let bugList = await BugModel.find(
        { appId },
    ).sort(
        { _id: -1 }
    ).lean();

    return bugList;
}

updateBugStatusById = async (bugId, status) => {
    let bugInstance = await BugModel.findByIdAndUpdate(bugId, {
        status
    }).lean();
}

createMessage = async (messageInstance) => {
    let newMessage = new MessageModel(messageInstance);

    await newMessage.save();
}

fetchMessagesForUser = async (userId) => {
    let messageList = await MessageModel.find(
        { userId },
    ).sort(
        { _id: -1 }
    ).lean();

    return messageList;
}

module.exports = {
    createBug,
    createUser,
    fetchBugsForApp,
    updateBugStatusById,
    createMessage,
    fetchMessagesForUser
};