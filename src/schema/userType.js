const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const SubjectItemType = require('./subjectItemType')
const TransactionType = require('./transactionType')
const TotalType = require('./totalType')


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    incomes: { type: GraphQLList(SubjectItemType) },
    accounts: { type: GraphQLList(SubjectItemType) },
    expenses: { type: GraphQLList(SubjectItemType) },
    total: { type: TotalType },
    transactions: { type: GraphQLList(TransactionType) }
  })
})

module.exports = UserType