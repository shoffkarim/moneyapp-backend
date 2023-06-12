const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat } = require('graphql')

const { TagType } = require('./tagType')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    idFrom: { type: GraphQLID },
    typeFrom: { type: GraphQLString },
    idTo: { type: GraphQLID },
    typeTo: { type: GraphQLString },
    value: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    tags: { type: GraphQLList(TagType)}
  })
})


module.exports = TransactionType