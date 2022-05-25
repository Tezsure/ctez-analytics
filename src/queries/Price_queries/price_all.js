const gql = require("graphql-request").gql;

module.exports = queryPriceDataAll = gql`
{
    pricestatsMonthly(distinct_on: timestampFrom, order_by: {timestampFrom: desc}, where: {timestampFrom: {_gte: "2022-02-01T00:00:00+00:00"}}) {
        ctezPrice
        id
        tezPrice
        timestampFrom
        timestampTo
        tokenSymbol
      }
}`