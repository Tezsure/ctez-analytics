const config = require("../../config/config");
const startTokenDataHandler = require("./transaction");
const startOvenDataHandler = require("./ovens");
const startMainDataHandler = require("./main_data");
const startTvlDataHandler = require("./tvl");
const startVolumeDataHandler = require("./volume");
const startPriceDataHandler = require("./price");

module.exports.startRequestHandler = () => {
    startTokenDataHandler();
    startOvenDataHandler();
    startMainDataHandler();
    startTvlDataHandler();
    startVolumeDataHandler();
    startPriceDataHandler();
    setInterval(() => {
        startTokenDataHandler();
        startOvenDataHandler();
        startMainDataHandler();
        startTvlDataHandler();
        startVolumeDataHandler();
        startPriceDataHandler();
    }, config.SET_TIMEOUT);
};