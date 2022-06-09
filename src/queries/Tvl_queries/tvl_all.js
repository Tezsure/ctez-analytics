const gql = require("graphql-request").gql;

module.exports = queryTvlDataAll = gql`
{
    tvlDataMonthly(order_by: {timestampFrom: desc}, distinct_on: timestampFrom, where: {timestampFrom: {_gte: "2022-02-01T00:00:00+00:00"}}) {
      ammTvl
      epochTimestampFrom
      epochTimestampTo
      id
      timestampFrom
      timestampTo
      ovenTvl
      }
}`