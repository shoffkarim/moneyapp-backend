const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = require('graphql')

const SubjectItemType = new GraphQLObjectType({
  name: 'SubjectItem',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    color: { type: GraphQLString },
    value: { type: GraphQLFloat },
  })
})

module.exports = SubjectItemType