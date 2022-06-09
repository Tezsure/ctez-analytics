const gql = require("graphql-request").gql;

module.exports = queryWithdrawData = gql`
{
    depositWithdrawData(distinct_on: timestamp, limit: 1000, where: {sideOven: {_eq: "0"}}, order_by: {timestamp: desc}) {
      address
      amount
      epochTimestamp
      id
      operationHash
      ovenAddress
      target
      timestamp
      }
}`