const { GraphQLID, GraphQLNonNull, GraphQLFloat } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')

const setTotal = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    incomes: { type: GraphQLNonNull(GraphQLFloat) },
    accounts: { type: GraphQLNonNull(GraphQLFloat) },
    expenses: { type: GraphQLNonNull(GraphQLFloat) },
  },
  resolve(parent, args) {
    return User.findByIdAndUpdate(

      args.id,
      {
        $set: {
          total: {
            incomes: args.incomes,
            accounts: args.accounts,
            expenses: args.expenses
          },
        }
      },
      { new: true }
    )
  }
}

module.exports = setTotal
