const gql = require("graphql-request").gql;

module.exports = queryTvlData = gql`
{
    tvlData(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 100) {
        timestamp
        tvl
        id
      }
}`