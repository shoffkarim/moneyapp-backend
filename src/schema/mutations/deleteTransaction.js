const { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFloat } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')


const deleteTransaction = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    transactionId: { type: GraphQLNonNull(GraphQLID) },
    idFrom: { type: GraphQLNonNull(GraphQLID) },
    idTo: { type: GraphQLNonNull(GraphQLID) },
    typeFrom: { type: GraphQLNonNull(GraphQLString) },
    typeTo: { type: GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLNonNull(GraphQLFloat) },
  },
  resolve(parent, args) {
    const userFound = User.findById(args.id)
    const data = userFound.then((user) => {
      const from = args.typeFrom === "incomes" ? user.incomes : user.accounts
      const to = args.typeTo === "accounts" ? user.accounts : user.expenses

      const fromSum = from.find((item) => item.id === args.idFrom).value
      const toSum = to.find((item) => item.id === args.idTo).value
      const totalIncomes = user.total.incomes
      const totalAccounts = user.total.accounts
      const totalExpenses = user.total.expenses
      return {
        fromSum,
        toSum,
        totalIncomes,
        totalAccounts,
        totalExpenses
      }
    })
    data.then((processedData) => {
      if(args.typeFrom === "incomes"){
        const sumFrom = processedData.fromSum - args.value
        const sumTo = processedData.toSum - args.value

        return (
          User.updateOne(
            {_id: args.id },
            {
              $pull: {
                transactions: { _id: args.transactionId}
              },
              $set: {
                "incomes.$[elementFrom].value": sumFrom,
                "accounts.$[elementTo].value": sumTo,
                "total.incomes": processedData.totalIncomes - args.value,
                "total.accounts": processedData.totalAccounts - args.value
              }
            },
            {
              arrayFilters: [
                { "elementFrom._id": args.idFrom },
                { "elementTo._id": args.idTo },
              ]
            }
          )
        )
      }


      if(args.typeFrom === "accounts" && args.typeTo === "expenses"){
        const sumFrom = processedData.fromSum + args.value
        const sumTo = processedData.toSum - args.value

        return (
          User.updateOne(
            {_id: args.id },
            {
              $pull: {
                transactions: { _id: args.transactionId}
              },
              $set: {
                "accounts.$[elementFrom].value": sumFrom,
                "expenses.$[elementTo].value": sumTo,
                "total.accounts": processedData.totalAccounts + args.value,
                "total.expenses": processedData.totalExpenses - args.value,
              }
            },
            {
              arrayFilters: [
                { "elementFrom._id": args.idFrom },
                { "elementTo._id": args.idTo },
              ]
            }
          )
        )
      }

      if(args.typeFrom === "accounts" && args.typeTo === "accounts"){
        const sumFrom = processedData.fromSum + args.value
        const sumTo = processedData.toSum - args.value

        return (
          User.updateOne(
            {_id: args.id },
            {
              $pull: {
                transactions: { _id: args.transactionId}
              },
              $set: {
                "accounts.$[elementFrom].value": sumFrom,
                "accounts.$[elementTo].value": sumTo,
              }
            },
            {
              arrayFilters: [
                { "elementFrom._id": args.idFrom },
                { "elementTo._id": args.idTo },
              ]
            }
          )
        )
      }

    })

  }
}

module.exports = deleteTransaction
