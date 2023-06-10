const { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFloat } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')
const { TagInputType } = require('../tagType')

const setTransaction = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    idFrom: { type: GraphQLNonNull(GraphQLID) },
    idTo: { type: GraphQLNonNull(GraphQLID) },
    value: { type: GraphQLNonNull(GraphQLFloat) },
    comment: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString)},
    tags: { type: GraphQLNonNull(GraphQLList(TagInputType))}
  },
  resolve(parent, args) {
    return User.findByIdAndUpdate(

      args.id,
      {
        $addToSet: {
          transactions: {
            idFrom: args.idFrom,
            idTo: args.idTo,
            value: args.value,
            comment: args.comment,
            date: args.date,
            tags: args.tags
          },
        }
      },
      { new: true }
    )
  }
}

module.exports = setTransaction
