const gql = require("graphql-request").gql;

module.exports = querySummaryData = gql`
{
  ovendata(order_by: {ctezStanding: desc}) {
    ctezStanding
    id
    ovenAddress
  }
      tvlData(distinct_on: timestamp, order_by: {timestamp: desc}, limit: 1) {
        ovenTvl
        ammTvl
        epochTimestamp
        timestamp
      }
}`