const gql = require("graphql-request").gql;

module.exports = querySwapData = gql`
{
  trade(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 100) {
    id
    price
    tezQty
    timestamp
    tokenQty
    trader
    sideTrade
  }
}`