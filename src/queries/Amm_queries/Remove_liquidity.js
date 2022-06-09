const gql = require("graphql-request").gql;

module.exports = queryRemoveLiquidityData = gql`
{
  position(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 1000, where: {sideLiquidity: {_eq: "0"}}) {
    id
    epochTimestamp
    operationHash
    quantityTk1
    quantityTk2
    timestamp
    tokenSymbol
    trader
    quantityBurn
    quantityMint
  }
}`