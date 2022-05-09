const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryMainData = require("../queries/Main_Data_queries/Main_Data")

module.exports = function startMainDataHandler() {

  request(`${config.GRAPHQL_API}/v1/graphql`, queryMainData).then(
    async (data) => {
      drift_data = filterDriftData(data.mainDataRegularize);
      target_data = filterTargetData(data.mainDataRegularize);
      fs.writeFileSync(config.Drift_DATA, JSON.stringify(drift_data));
      fs.writeFileSync(config.Target_DATA_One, JSON.stringify(target_data));
    }
  ).catch((err) => {
    console.log(err);
  });

  function filterDriftData(data) {
    let drift = [];
    for(let i = 0; i<data.length; i++){
        let obj = {};
        obj.id = data[i].id;
        obj.currentAnnualDrift = data[i].currentAnnualDrift;
        obj.timestamp = data[i].timestamp;
        drift.push(obj);
    }
    return drift;
  }

  function filterTargetData(data) {
    let target = [];
    for(let i = 0; i<data.length; i++){
        let obj = {};
        obj.id = data[i].id;
        obj.current_price = data[i].current_price;
        obj.current_target = data[i].current_target;
        obj.premium = data[i].premium;
        obj.timestamp = data[i].timestamp;
        target.push(obj);
    }
    return target;
  }

}