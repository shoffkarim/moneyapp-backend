const { GraphQLID, GraphQLString, GraphQLFloat, GraphQLNonNull } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const updateExpense = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    idCard: { type: GraphQLNonNull(GraphQLID) },
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

      const item = user.expenses.find((item) => item.id === args.idCard)
      return counter - item.value + args.value
    })
    sum.then(s => {
      return (
        User.updateOne(
          {_id: args.id },
          {
            $set: {
              "expenses.$[element].name": args.name,
              "expenses.$[element].icon": args.icon,
              "expenses.$[element].color": args.color,
              "expenses.$[element].value": args.value,
              "total.expenses": s
            },
          },
          {
            arrayFilters: [
              { "element._id": args.idCard },
            ]
          }
        )
      )
    })
  }
}

module.exports = updateExpense
