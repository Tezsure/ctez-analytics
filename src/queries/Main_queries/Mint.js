const gql = require("graphql-request").gql;

module.exports = queryMintData = gql`
{
    mintBurnData(distinct_on: timestamp, limit: 1000, order_by: {timestamp: desc}, where: {mintAmount: {_neq: "0"}}) {
        address
        epochTimestamp
        id
        mintAmount
        operationHash
        ovenAddress
        target
        timestamp
    }
}`