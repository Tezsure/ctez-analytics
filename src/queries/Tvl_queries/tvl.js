const gql = require("graphql-request").gql;

module.exports = queryTvlData = (date) => gql`
{
    tvlData(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 100
      where: {
        timestamp: {
          _gte: "${new Date(date).toUTCString()}"
        }
      }
      ) {
        timestamp
        tvl
        id
      }
}`