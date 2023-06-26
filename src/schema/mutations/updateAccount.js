const { GraphQLID, GraphQLString, GraphQLFloat, GraphQLNonNull } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const updateAccount = {
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
      const counter = user.accounts.reduce((acc, item) => {
        acc += item.value
        return acc
      }, 0)

      const item = user.accounts.find((item) => item.id === args.idCard)
      return counter - item.value + args.value
    })
    sum.then(s => {
      return (
        User.updateOne(
          {_id: args.id },
          {
            $set: {
              "accounts.$[element].name": args.name,
              "accounts.$[element].icon": args.icon,
              "accounts.$[element].color": args.color,
              "accounts.$[element].value": args.value,
              "total.accounts": s
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

module.exports = updateAccount
