const gql = require("graphql-request").gql;

module.exports = queryPriceData = gql`
{
    pricestats(distinct_on: timestamp, limit: 100, order_by: {timestamp: desc}) {
        id
        level
        price
        timestamp
      }
}`