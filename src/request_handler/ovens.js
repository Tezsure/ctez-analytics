const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryOvenData = require("../queries/Ovens_queries/Ovens")

module.exports = function startOvenDataHandler() {

  request(`${config.GRAPHQL_API}/v1/graphql`, queryOvenData).then(
    async (data) => {
      data = formatData(data);
      fs.writeFileSync(config.Oven_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });

  function formatData(data) {
    let total_ovens = 0;
    for(let i = 0; i<data.ovendata.length; i++){
      if(data.ovendata[i].ctezStanding!=0){total_ovens++;}
      // console.log(data.ovendata[i].ctezStanding);
    }
    return {
      total_ovens: total_ovens,
      created_ovens: data.ovendata.length,
      liquidated_ovens: data.ovensLiquidated.length,
      TVL: data.tvlData[0].tvl,
      total_supply: data.supply[0].totalSupply,
      collateral_supply: data.tezOven[0].collateralSupply
    }

  }

}