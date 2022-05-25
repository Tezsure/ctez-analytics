const gql = require("graphql-request").gql;

module.exports = queryVolumeMonthsData = gql`
{
    volumestatsMonthly(distinct_on: timestampFrom, order_by: {timestampFrom: desc}, where: {timestampFrom: {_gte: " 2022-02-01T00:00:00+00:00"}}) {
        id
        timestampFrom
        timestampTo
        tokenSymbol
        volume
      }
}`