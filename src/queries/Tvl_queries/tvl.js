const gql = require("graphql-request").gql;

module.exports = queryTvlData = (date) => gql`
{
    tvlData(distinct_on: timestamp, order_by: {timestamp: desc},
      where: {
        timestamp: {
          _gte: "${new Date(date).toUTCString()}"
        }
      }
      ) {
        ovenTvl
        epochTimestamp
        timestamp
        ammTvl
        id
      }
}`