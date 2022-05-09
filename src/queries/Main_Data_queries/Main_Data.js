const gql = require("graphql-request").gql;

module.exports = queryMainData = gql`
{
    mainDataRegularize(distinct_on: timestamp, limit: 100, order_by: {timestamp: desc}) {
        currentAnnualDrift
        currentPrice
        currentTarget
        id
        premium
        timestamp
      }
}`