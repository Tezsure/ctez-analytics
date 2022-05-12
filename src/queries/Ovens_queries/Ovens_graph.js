const gql = require("graphql-request").gql;

module.exports = queryOven_Graph_Data = gql`
{
    ovendata(distinct_on: id, order_by: {id: desc}) {
        ctezStanding
        id
        ovenAddress
        tezStanding
        timestamp
      }
}`