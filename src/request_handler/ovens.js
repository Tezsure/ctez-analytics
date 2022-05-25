const request = require("graphql-request").request;
const fs = require("fs");
const config = require("../../config/config");
const queryOvenData = require("../queries/Ovens_queries/Ovens")
const queryOven_Graph_Data = require("../queries/Ovens_queries/Ovens_graph")
const querySummaryData = require("../queries/Ovens_queries/Summary")

module.exports = function startOvenDataHandler() {
 
  // Api for the ovens data table

  request(`${config.GRAPHQL_API}/v1/graphql`, queryOvenData).then(
    async (data) => {
      data = formatData(data);
      fs.writeFileSync(config.Oven_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });

  // Api for the summary 

  request(`${config.GRAPHQL_API}/v1/graphql`, querySummaryData).then(
    async (data) => {
      data = formatSummaryData(data);
      fs.writeFileSync(config.Summary_DATA, JSON.stringify(data));
    }
  ).catch((err) => {
    console.log(err);
  });

  // Api for the ovens graph

  request(`${config.GRAPHQL_API}/v1/graphql`, queryOven_Graph_Data).then(
    async (data) => {
      fs.writeFileSync(config.Oven_Graph_DATA, JSON.stringify(data.ovendata));
    }
  ).catch((err) => {
    console.log(err);
  });

  function formatData(data) {
    let total_ovens = 0;
    for(let i = 0; i<data.ovendata.length; i++){
      if(data.ovendata[i].ctezStanding>0){total_ovens++;}
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

  function formatSummaryData(data) {
    let total_ovens = 0;
    for(let i = 0; i<data.ovendata.length; i++){
      if(data.ovendata[i].ctezStanding>0){total_ovens++;}
    }
    return {
      total_ovens: total_ovens,
      TVL: data.tvlData[0].tvl,
    }

  }

}