const User = require('../models/User')
const UserType = require('./userType')

const addUser = require('./mutations/addUser')
const setIncome = require('./mutations/setIncome')
const setAccount = require('./mutations/setAccount')
const setExpense = require('./mutations/setExpense')
const setTotal = require('./mutations/setTotal')
const setTransaction = require('./mutations/setTransaction')

const { GraphQLObjectType, GraphQLID, GraphQLSchema, GraphQLList, GraphQLString } = require('graphql')
const TransactionType = require('./transactionType')



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
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})