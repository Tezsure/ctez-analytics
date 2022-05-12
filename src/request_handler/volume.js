const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryTvlData = require("../queries/Volume_queries/volume")

module.exports = function startVolumeDataHandler() {

  request(`${config.GRAPHQL_API}/v1/graphql`, queryVolumeData).then(
    async (data) => {
        // console.log(data);
        fs.writeFileSync(config.Volume_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });

}
