const config = require("../../config/config");
const startTokenDataHandler = require("./transaction");
const startOvenDataHandler = require("./ovens");
const startMainDataHandler = require("./main_data");

module.exports.startRequestHandler = () => {
    startTokenDataHandler();
    startOvenDataHandler();
    startMainDataHandler();
    setInterval(() => {
        startTokenDataHandler();
        startOvenDataHandler();
        startMainDataHandler();
    }, config.SET_TIMEOUT);
};