const gql = require("graphql-request").gql;

module.exports = queryAddLiquidityData = gql`
{
    position(order_by: {timestamp: desc}, limit: 100, distinct_on: timestamp, where: {sideLiquidity: {_eq: "1"}}) {
        id
        quantityBurn
        quantityMint
        quantityPool1
        quantityPool2
        quantityTk1
        quantityTk2
        timestamp
        trader
      }
}`