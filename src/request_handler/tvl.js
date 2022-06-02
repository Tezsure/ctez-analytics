const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryTvlData = require("../queries/Tvl_queries/tvl")
const queryTvlDataAll = require("../queries/Tvl_queries/tvl_all")

module.exports = function startTvlDataHandler() {

  const date = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
  request(`${config.GRAPHQL_API}/v1/graphql`, queryTvlData(date)).then(
    async (data) => {
        fs.writeFileSync(config.Tvl_DATA, JSON.stringify(data.tvlData));
    }
  ).catch((err) => {
    console.log(err);
  });

  request(`${config.GRAPHQL_API}/v1/graphql`, queryTvlDataAll).then(
    async (data) => {
        fs.writeFileSync(config.Tvl_DATA_All, JSON.stringify(data.tvlDataMonthly));
    }
  ).catch((err) => {
    console.log(err);
  });

}
