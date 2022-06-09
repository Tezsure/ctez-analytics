const gql = require("graphql-request").gql;

module.exports = queryVolumeData = (date) => gql`
{
    volumestats(distinct_on: timestamp, limit: 100, order_by: {timestamp: desc}
      where: {
        timestamp: {
          _gte: "${new Date(date).toUTCString()}"
        }
      }
      
      ) {
        epochTimestamp
        volume24hours
        tokenSymbol
        timestamp
        id
      }
}`