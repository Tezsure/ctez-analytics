const gql = require("graphql-request").gql;

module.exports = querySummaryData = gql`
{
    ovendata(distinct_on: timestamp, order_by: {timestamp: desc}) {
        ctezStanding
        id
        liquidation
        ovenAddress
        tezStanding
        timestamp
      }
      tvlData(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 1) {
        tvl
        timestamp
      }
}`