const gql = require("graphql-request").gql;

module.exports = queryPriceData = (date) => gql`
{
  pricestats(distinct_on: timestamp, order_by: {timestamp: desc}
    where: {
      timestamp: {
        _gte: "${new Date(date).toUTCString()}"
      }
    }
    ) {
    ctezPrice
    id
    level
    tezPrice
    timestamp
    tokenSymbol
  }
}`