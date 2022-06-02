const gql = require("graphql-request").gql;

module.exports = queryOven_Graph_Data = gql`
{
  ovendata(order_by: {ctezStanding: desc}) {
    ctezStanding
    id
    ovenAddress
  }
}`