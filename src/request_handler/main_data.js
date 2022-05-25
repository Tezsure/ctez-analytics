const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryMainData = require("../queries/Main_Data_queries/Main_Data")
const queryMainDataAll = require("../queries/Main_Data_queries/Main_Data_All")

module.exports = function startMainDataHandler() {

  const date = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
  request(`${config.GRAPHQL_API}/v1/graphql`, queryMainData(date)).then(
    async (data) => {
      drift_data = filterDriftData(data.mainDataRegularize);
      target_data = filterTargetData(data.mainDataRegularize);
      fs.writeFileSync(config.Drift_DATA, JSON.stringify(drift_data));
      fs.writeFileSync(config.Target_DATA_One, JSON.stringify(target_data));
    }
  ).catch((err) => {
    console.log(err);
  });


  request(`${config.GRAPHQL_API}/v1/graphql`, queryMainDataAll).then(
    async (data) => {
      // console.log(data);
      drift_data = filterDriftDataAll(data.mainDataRegularizeMonthly);
      target_data = filterTargetDataAll(data.mainDataRegularizeMonthly);
      fs.writeFileSync(config.Drift_DATA_All, JSON.stringify(drift_data));
      fs.writeFileSync(config.Target_DATA_One_All, JSON.stringify(target_data));
    }
  ).catch((err) => {
    console.log(err);
  });

  function filterDriftData(data) {
    let drift = [];
    for(let i = 0; i<data.length; i++){
        let obj = {};
        obj.id = data[i].id;
        obj.drift = data[i].currentAnnualDrift;
        obj.timestamp = data[i].timestamp;
        drift.push(obj);
    }
    return drift;
  }

  function filterDriftDataAll(data) {
    // console.log(data);
    let drift = [];
    for(let i = 0; i<data.length; i++){
        let obj = {};
        obj.id = data[i].id;
        obj.drift = data[i].currentAnnualDrift;
        // console.log(data[i])
        obj.timestamp_from = data[i].timestampFrom;
        obj.timestamp_to = data[i].timestampTo;
        drift.push(obj);
    }
    return drift;
  }

  function filterTargetData(data) {
    // console.log("hey", data);
    let target = [];
    // console.log(data);
    for(let i = 0; i<data.length; i++){
        let obj = {};
        obj.id = data[i].id;
        obj.current_price = data[i].currentPrice;
        obj.current_target = data[i].currentTarget;
        obj.premium = data[i].premium;
        obj.timestamp = data[i].timestamp;
        target.push(obj);
    }
    return target;
  }

  function filterTargetDataAll(data) {
    let target = [];
    // console.log(data);
    for(let i = 0; i<data.length; i++){
        let obj = {};
        obj.id = data[i].id;
        obj.current_price = data[i].currentPrice;
        obj.current_target = data[i].currentTarget;
        obj.premium = data[i].premium;
        obj.timestamp_from = data[i].timestampFrom;
        obj.timestamp_to = data[i].timestampTo;
        target.push(obj);
    }
    return target;
  }

}