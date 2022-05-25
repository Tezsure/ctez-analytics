const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryVolumeData = require("../queries/Volume_queries/volume")
const queryVolumeMonthsData = require("../queries/Volume_queries/volume_months")

module.exports = function startVolumeDataHandler() {

  const date = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
  request(`${config.GRAPHQL_API}/v1/graphql`, queryVolumeData(date)).then(
    async (data) => {
        fs.writeFileSync(config.Volume_DATA, JSON.stringify(data.volumestats));
    }
  ).catch((err) => {
    console.log(err);
  });

  
  request(`${config.GRAPHQL_API}/v1/graphql`, queryVolumeMonthsData).then(
    async (data) => {
        fs.writeFileSync(config.Volume_DATA_Months, JSON.stringify(data.volumestatsMonthly));
    }
  ).catch((err) => {
    console.log(err);
  });

}
