const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryPriceData = require("../queries/Price_queries/price")

module.exports = function startPriceDataHandler() {

  request(`${config.GRAPHQL_API}/v1/graphql`, queryPriceData).then(
    async (data) => {
      // console.log(data);
        data = formatData(data.pricestats);
        fs.writeFileSync(config.Price_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });

  function formatData(data) {
    let prices = [];
    for(let i = 0; i<data.length; i++){
      tez = 1/data[i].price;
      let obj = {};
      obj.ctez_price = data[i].price;
      obj.tez_price = tez.toFixed(5);
      obj.timestamp = data[i].timestamp;
      prices.push(obj);
    }
    return prices;

  }

}
