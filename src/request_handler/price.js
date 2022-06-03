const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryPriceData = require("../queries/Price_queries/price")
const queryPriceDataAll = require("../queries/Price_queries/price_all")
const queryTvlData = require("../queries/Tvl_queries/tvl")
const queryTvlDataAll = require("../queries/Tvl_queries/tvl_all")

module.exports = async function startPriceDataHandler() {

  let date = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
  let price_stats = [];
  let price_stats_all = [];
  let tvl = [];
  let tvl_all = [];
  await request(`${config.GRAPHQL_API}/v1/graphql`, queryPriceData(date)).then(
    async (data) => {
      price_stats = data;
    }
  ).catch((err) => {
    console.log(err);
  });


  await request(`${config.GRAPHQL_API}/v1/graphql`, queryPriceDataAll).then(
    async (data) => {
      price_stats_all = data.pricestatsMonthly;
    }
  ).catch((err) => {
    console.log(err);
  });

  await request(`${config.GRAPHQL_API}/v1/graphql`, queryTvlData(date)).then(
    async (data) => {
      tvl = data.tvlData
    }
  ).catch((err) => {
    console.log(err);
  });

  await request(`${config.GRAPHQL_API}/v1/graphql`, queryTvlDataAll).then(
    async (data) => {
      tvl_all = data.tvlDataMonthly
    }
  ).catch((err) => {
    console.log(err);
  });

  price_stats = formatData(price_stats.pricestats, tvl);
  price_stats_all = formatData_All(price_stats_all, tvl_all);

  fs.writeFileSync(config.Price_DATA, JSON.stringify(price_stats));
  fs.writeFileSync(config.Price_DATA_ALL, JSON.stringify(price_stats_all))

  function formatData(data, tvl_data) {
    let prices = [];
    for(let i = 0; i<data.length; i++){
      let obj = {};
      obj.ctez_price = data[i].ctezPrice;
      obj.tez_price = data[i].tezPrice.toFixed(5);
      obj.timestamp = data[i].timestamp;
      obj.tvl = tvl_data[i].tvl
      prices.push(obj);
    }
    return prices;

  }

  function formatData_All(data, tvl_data) {
    let prices = [];
    for(let i = 0; i<data.length; i++){
      let obj = {};
      obj.ctez_price = data[i].ctezPrice;
      obj.tez_price = data[i].tezPrice.toFixed(5);
      obj.timestamp_from = data[i].timestampFrom;
      obj.timestamp_to = data[i].timestampTo
      obj.tvl = tvl_data[i].tvl
      prices.push(obj);
    }
    return prices;

  }

}
