const { GraphQLID, GraphQLString, GraphQLFloat, GraphQLNonNull } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const setExpense = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    icon: { type: GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLNonNull(GraphQLFloat) }
  },
  resolve(parent, args) {
    return User.findByIdAndUpdate(
      args.id,
      {
        $addToSet: {
          expenses: {
            name: args.name,
            icon: args.icon,
            color: args.color,
            value: args.value
          },
        }
      },
      { new: true }
    )
  }
}

module.exports = setExpense
