const gql = require("graphql-request").gql;

module.exports = queryOvenData = gql`
{
  ovendata(distinct_on: timestamp, order_by: {timestamp: desc}) {
    ctezStanding
    id
    liquidation
    ovenAddress
    tezStanding
    timestamp
  }
  supply {
    id
    totalSupply
  }
      tezOven(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 1) {
        id
        collateralSupply
        timestamp
      }
      ovensLiquidated {
        id
      }
      tvlData(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 1) {
        tvl
        timestamp
      }
}`