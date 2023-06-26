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
    const userFound = User.findById(args.id)
    const sum = userFound.then((user) => {
      const counter = user.expenses.reduce((acc, item) => {
        acc += item.value
        return acc
      }, 0)

      return counter + args.value
    })
    sum.then(s => {
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
          },
          $set: {
            "total.expenses": s
          }
        },
        { new: true }
      )
    })
  }
}

module.exports = setExpense
