const gql = require("graphql-request").gql;

module.exports = queryMainData = (date) => gql`
{
    mainDataRegularize(distinct_on: timestamp, order_by: {timestamp: desc}
      where: {
        timestamp: {
          _gte: "${new Date(date).toUTCString()}"
        }
      }
      ) {
        currentAnnualDrift
        currentPrice
        currentTarget
        id
        premium
        timestamp
      }
}`