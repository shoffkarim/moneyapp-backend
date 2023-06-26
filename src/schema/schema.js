const User = require('../models/User')
const UserType = require('./userType')

const addUser = require('./mutations/addUser')
const setIncome = require('./mutations/setIncome')
const setAccount = require('./mutations/setAccount')
const setExpense = require('./mutations/setExpense')
const setTotal = require('./mutations/setTotal')
const setTransaction = require('./mutations/setTransaction')
const updateAccount = require('./mutations/updateAccount')
const updateIncome = require('./mutations/updateIncome')
const updateExpense = require('./mutations/updateExpense')

const { GraphQLObjectType, GraphQLID, GraphQLSchema, GraphQLList, GraphQLString } = require('graphql')
const TransactionType = require('./transactionType')
const CalendarDayItemType = require('./calendarItemsType')

const handleData = require('./utils/handleData')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find()
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    transactions: {
      type: new GraphQLList(TransactionType),
      args: {
        id: { type: GraphQLID },
        firstDay: { type: GraphQLString },
        lastDay: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.findById(args.id).then((user) => user.transactions.filter((item) => {
          if(new Date(item.date) >= new Date(args.firstDay) && new Date(item.date) <= new Date(args.lastDay)) {
            return item
          }
        }))
      }
    },
    calendarItems: {
      type: new GraphQLList(CalendarDayItemType),
      args: {
        id: { type: GraphQLID },
        firstDay: { type: GraphQLString },
        lastDay: { type: GraphQLString }
      },
      resolve(parent, args) {
        const userFound = User.findById(args.id)
        const data = userFound.then((user) => {
          const transactions = user.transactions.filter((item) => {
            if(new Date(item.date) >= new Date(args.firstDay) && new Date(item.date) <= new Date(args.lastDay)) {
              return item
            }
          })
          const cards = {
            incomes: user.incomes,
            accounts: user.accounts,
            expenses: user.expenses,
          }

          return handleData(cards, transactions)
        })

        return data
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser,
    setIncome,
    setAccount,
    setExpense,
    setTotal,
    setTransaction,
    updateAccount,
    updateIncome,
    updateExpense
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})