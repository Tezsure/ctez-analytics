const gql = require("graphql-request").gql;

module.exports = queryBurnData = gql`
{
    mintBurnData(distinct_on: timestamp, limit: 1000, order_by: {timestamp: desc}, where: {burnAmount: {_neq: "0"}}) {
        id
        address
        ovenAddress
        target
        timestamp
        burnAmount
      }
}`