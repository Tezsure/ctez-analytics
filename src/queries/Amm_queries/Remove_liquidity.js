const gql = require("graphql-request").gql;

module.exports = queryRemoveLiquidityData = gql`
{
    position(order_by: {timestamp: desc}, limit: 1000, distinct_on: timestamp, where: {sideLiquidity: {_eq: "0"}}) {
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