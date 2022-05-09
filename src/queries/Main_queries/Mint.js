const gql = require("graphql-request").gql;

module.exports = queryMintData = gql`
{
    mintBurnData(distinct_on: timestamp, limit: 100, order_by: {timestamp: desc}, where: {mintAmount: {_neq: "0"}}) {
        id
        mintAmount
        address
        ovenAddress
        target
        timestamp
    }
}`