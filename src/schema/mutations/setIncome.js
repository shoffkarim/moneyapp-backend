const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLFloat } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const setIncome = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    icon: { type: GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLNonNull(GraphQLFloat) },
  },
  resolve(parent, args) {
    return User.findByIdAndUpdate(
      args.id,
      {
        $addToSet: {
          incomes: {
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

module.exports = setIncome
