const gql = require("graphql-request").gql;

module.exports = queryWithdrawData = gql`
{
    depositWithdrawData(distinct_on: timestamp, limit: 100, where: {sideOven: {_eq: "0"}}, order_by: {timestamp: desc}) {
        address
        amount
        id
        ovenAddress
        sideOven
        target
        timestamp
      }
}`