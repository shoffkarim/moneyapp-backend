const { GraphQLString, GraphQLNonNull } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const addUser = {
  type: UserType,
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    const user = new User({
      name: args.name,
      email: args.email,
      password: args.password,
      incomes: [],
      accounts: [],
      expenses: [],
      total: {
        incomes: 0,
        accounts: 0,
        expenses: 0
      },
      tags: [],
      transactions: []
    })

    return user.save()
  }
}

module.exports = addUser