const { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFloat } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')
const { TagInputType } = require('../tagType')

const editTransaction = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    transactionId: { type: GraphQLNonNull(GraphQLID) },
    idFrom: { type: GraphQLNonNull(GraphQLID) },
    idTo: { type: GraphQLNonNull(GraphQLID) },
    typeFrom: { type: GraphQLNonNull(GraphQLString) },
    typeTo: { type: GraphQLNonNull(GraphQLString) },
    value: { type: GraphQLNonNull(GraphQLFloat) },
    comment: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString)},
    tags: { type: GraphQLNonNull(GraphQLList(TagInputType))}
  },
  resolve(parent, args) {
    const userFound = User.findById(args.id)
    const dataPromise = userFound.then((user) => {
      const from = args.typeFrom === "incomes" ? user.incomes : user.accounts
      const to = args.typeTo === "accounts" ? user.accounts : user.expenses

      const transaction = user.transactions.find((item) => item.id === args.transactionId)

      const oldValue = transaction.value

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
        totalExpenses,
        oldValue
      }
    })
    dataPromise.then((data) => {
      if(args.typeFrom === "incomes"){
        const sumFrom = data.fromSum - data.oldValue + args.value
        const sumTo = data.toSum - data.oldValue + args.value

        return (
          User.updateOne(
            {_id: args.id },
            {
              $set: {
                "incomes.$[elementFrom].value": sumFrom,
                "accounts.$[elementTo].value": sumTo,
                "total.incomes": data.totalIncomes - data.oldValue + args.value,
                "total.accounts": data.totalAccounts - data.oldValue + args.value,
                "transactions.$[element].value": args.value,
                "transactions.$[element].idFrom,": args.idFrom,
                "transactions.$[element].typeFrom": args.typeFrom,
                "transactions.$[element].idTo": args.idTo,
                "transactions.$[element].typeTo": args.typeTo,
                "transactions.$[element].comment": args.comment,
                "transactions.$[element].date": args.date,
                "transactions.$[element].tags": args.tags
              }
            },
            {
              arrayFilters: [
                { "element._id": args.transactionId },
                { "elementFrom._id": args.idFrom },
                { "elementTo._id": args.idTo },
              ]
            }
          )
        )
      }

      if(args.typeFrom === "accounts" && args.typeTo === "expenses"){
        const sumFrom = data.fromSum + data.oldValue - args.value
        const sumTo = data.toSum - data.oldValue + args.value
        return (
          User.updateOne(
            {_id: args.id },
            {
              $set: {
                "accounts.$[elementFrom].value": sumFrom,
                "expenses.$[elementTo].value": sumTo,
                "total.accounts": data.totalAccounts + data.oldValue - args.value,
                "total.expenses": data.totalExpenses - data.oldValue + args.value,
                "transactions.$[element].value": args.value,
                "transactions.$[element].idFrom,": args.idFrom,
                "transactions.$[element].typeFrom": args.typeFrom,
                "transactions.$[element].idTo": args.idTo,
                "transactions.$[element].typeTo": args.typeTo,
                "transactions.$[element].comment": args.comment,
                "transactions.$[element].date": args.date,
                "transactions.$[element].tags": args.tags
              }
            },
            {
              arrayFilters: [
                { "element._id": args.transactionId },
                { "elementFrom._id": args.idFrom },
                { "elementTo._id": args.idTo },
              ]
            }
          )
        )
      }

      if(args.typeFrom === "accounts" && args.typeTo === "accounts"){
        const sumFrom = data.fromSum + data.oldValue - args.value
        const sumTo = data.toSum - data.oldValue + args.value
        return (
          User.updateOne(
            {_id: args.id },
            {
              $set: {
                "accounts.$[elementFrom].value": sumFrom,
                "accounts.$[elementTo].value": sumTo,
                "transactions.$[element].value": args.value,
                "transactions.$[element].idFrom,": args.idFrom,
                "transactions.$[element].typeFrom": args.typeFrom,
                "transactions.$[element].idTo": args.idTo,
                "transactions.$[element].typeTo": args.typeTo,
                "transactions.$[element].comment": args.comment,
                "transactions.$[element].date": args.date,
                "transactions.$[element].tags": args.tags
              }
            },
            {
              arrayFilters: [
                { "element._id": args.transactionId },
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

module.exports = editTransaction
