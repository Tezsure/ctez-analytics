const gql = require("graphql-request").gql;

module.exports = queryOvenData = gql`
{
  ovendata(order_by: {ctezStanding: desc}) {
    ctezStanding
    id
    ovenAddress
  }
  tezOven(order_by: {timestamp: desc}, distinct_on: timestamp, limit: 1) {
    collateralSupply
    ctezInAllOvens
    tezInAllOvens
    timestamp
  }
      ovensLiquidated {
        id
      }
      mainData(order_by: {timestamp: desc}, distinct_on: timestamp, limit: 1) {
        currentPrice
        timestamp
      }
}`