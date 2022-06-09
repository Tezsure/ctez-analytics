const gql = require("graphql-request").gql;

module.exports = querySwapData = gql`
{
  trade(distinct_on: timestamp, limit: 1000, order_by: {timestamp: desc}) {
    epochTimestamp
    id
    operationHash
    price
    sideTrade
    tezQty
    timestamp
    tokenQty
    trader
  }
}`