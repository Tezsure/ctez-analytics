const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryTvlData = require("../queries/Tvl_queries/tvl")

module.exports = function startTvlDataHandler() {

  request(`${config.GRAPHQL_API}/v1/graphql`, queryTvlData).then(
    async (data) => {
        // console.log(data);
        fs.writeFileSync(config.Tvl_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });

}
