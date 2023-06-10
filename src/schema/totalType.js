const { GraphQLObjectType, GraphQLFloat } = require('graphql')

const TotalType = new GraphQLObjectType({
  name: 'Total',
  fields: () => ({
    incomes: { type: GraphQLFloat },
    accounts: { type: GraphQLFloat },
    expenses: { type: GraphQLFloat },
  })
})

module.exports = TotalType