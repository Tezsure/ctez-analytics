const gql = require("graphql-request").gql;

module.exports = queryMainDataAll = gql`
{
    mainDataRegularizeMonthly(distinct_on: timestampFrom, order_by: {timestampFrom: desc}, where: {timestampFrom: {_gte: " 2022-02-01T00:00:00+00:00"}}) {
        currentAnnualDrift
        currentPrice
        currentTarget
        id
        premium
        timestampFrom
        timestampTo
      }
}`