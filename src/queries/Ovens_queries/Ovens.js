const gql = require("graphql-request").gql;

module.exports = queryOvenData = gql`
{
  ovendata(order_by: {ctezStanding: desc}) {
    ctezStanding
    id
    ovenAddress
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