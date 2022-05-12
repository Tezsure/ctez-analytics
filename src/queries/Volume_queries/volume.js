const gql = require("graphql-request").gql;

module.exports = queryVolumeData = gql`
{
    volumestats(distinct_on: timestamp, limit: 100, order_by: {timestamp: desc}) {
        sellVolume
        buyVolume
        timestamp
        volume24hours
      }
}`