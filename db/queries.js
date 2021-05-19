let { InstanceModel } = require('./models');

createInstance = (instance) => {
    let newInstance = new InstanceModel(instance);

    return newInstance;
}

module.exports = {
    createInstance
};