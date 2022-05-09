const gql = require("graphql-request").gql;

module.exports = queryDepositData = gql`
{
    depositWithdrawData(distinct_on: timestamp, limit: 100, where: {sideOven: {_eq: "1"}}, order_by: {timestamp: desc}) {
        address
        amount
        id
        ovenAddress
        sideOven
        target
        timestamp
      }
}`