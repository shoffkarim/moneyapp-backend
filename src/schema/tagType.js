const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType } = require('graphql')

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    id: { type: GraphQLID },
    tagId: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

const TagInputType = new GraphQLInputObjectType({
  name: 'TagInput',
  fields: {
    tagId: { type: GraphQLID },
    name: { type: GraphQLString },
  }
})

module.exports = { TagType, TagInputType}