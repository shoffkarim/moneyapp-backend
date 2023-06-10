const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat } = require('graphql')

const { TagType } = require('./tagType')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    idFrom: { type: GraphQLID },
    idTo: { type: GraphQLID },
    value: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    tags: { type: GraphQLList(TagType)}
  })
})


module.exports = TransactionType