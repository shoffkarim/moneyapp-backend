const { GraphQLID, GraphQLString, GraphQLFloat, GraphQLNonNull } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const updateIncome = {
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
      const counter = user.incomes.reduce((acc, item) => {
        acc += item.value
        return acc
      }, 0)

      const item = user.incomes.find((item) => item.id === args.idCard)
      return counter - item.value + args.value
    })
    sum.then(s => {
      return (
        User.updateOne(
          {_id: args.id },
          {
            $set: {
              "incomes.$[element].name": args.name,
              "incomes.$[element].icon": args.icon,
              "incomes.$[element].color": args.color,
              "incomes.$[element].value": args.value,
              "total.incomes": s
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

module.exports = updateIncome
