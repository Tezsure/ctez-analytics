const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryPriceData = require("../queries/Price_queries/price")
const queryPriceDataAll = require("../queries/Price_queries/price_all")

module.exports = function startPriceDataHandler() {

  const date = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
  request(`${config.GRAPHQL_API}/v1/graphql`, queryPriceData(date)).then(
    async (data) => {
        data = formatData(data.pricestats);
        fs.writeFileSync(config.Price_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });


  request(`${config.GRAPHQL_API}/v1/graphql`, queryPriceDataAll).then(
    async (data) => {
        fs.writeFileSync(config.Price_DATA_ALL, JSON.stringify(data.pricestatsMonthly));
    }
  ).catch((err) => {
    console.log(err);
  });

  function formatData(data) {
    // console.log(data);
    let prices = [];
    for(let i = 0; i<data.length; i++){
      // tez = 1/data[i].price;
      let obj = {};
      obj.ctez_price = data[i].ctezPrice;
      obj.tez_price = data[i].tezPrice.toFixed(5);
      obj.timestamp = data[i].timestamp;
      prices.push(obj);
    }
    return prices;

  }

}
