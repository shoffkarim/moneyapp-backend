const Project = require('../models/Project')
const Client = require('../models/Client')
const User = require('../models/User')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLFloat, GraphQLScalarType } = require('graphql')


const History = new GraphQLObjectType({
  name: 'History',
  fields: () => ({
    id: { type: GraphQLID },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    sum: { type: GraphQLFloat }
  })
})

const SubjectItemType = new GraphQLObjectType({
  name: 'SubjectItem',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    color: { type: GraphQLString },
    value: { type: GraphQLFloat },
  })
})

const SubjectsType = new GraphQLObjectType({
  name: 'Subjects',
  fields: () => ({
    incomes: { type: GraphQLList(SubjectItemType) },
    accounts: { type: GraphQLList(SubjectItemType) },
    expenses: { type: GraphQLList(SubjectItemType) },
  })
})

const TotalType = new GraphQLObjectType({
  name: 'Total',
  fields: () => ({
    incomes: { type: GraphQLFloat },
    accounts: { type: GraphQLFloat },
    expenses: { type: GraphQLFloat },
  })
})

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
})

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    idFrom: { type: GraphQLID },
    idTo: { type: GraphQLID },
    value: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    tags: { type: GraphQLList(TagType)}
  })
})

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


const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    history: { type: GraphQLList(History) }
  })
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Client.findById(args.id)
      }
    },
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
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
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
    },

    setIncome: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        icon: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLNonNull(GraphQLFloat) },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $addToSet: {
              incomes: {
                name: args.name,
                icon: args.icon,
                color: args.color,
                value: args.value
              },
            }
          },
          { new: true }
        )
      }
    },

    setAccount: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        icon: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $addToSet: {
              accounts: {
                name: args.name,
                icon: args.icon,
                color: args.color,
                value: args.value
              },
            }
          },
          { new: true }
        )
      }
    },

    setExpense: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        icon: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $addToSet: {
              expenses: {
                name: args.name,
                icon: args.icon,
                color: args.color,
                value: args.value
              },
            }
          },
          { new: true }
        )
      }
    },
    setTotal: {
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
    },

    setTransaction: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        idFrom: { type: GraphQLNonNull(GraphQLID) },
        idTo: { type: GraphQLNonNull(GraphQLID) },
        value: { type: GraphQLNonNull(GraphQLFloat) },
        comment: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(

          args.id,
          {
            $addToSet: {
              transactions: {
                idFrom: args.idFrom,
                idTo: args.idTo,
                value: args.value,
                comment: args.comment,
                date: args.date,
                tags: []
              },
            }
          },
          { new: true }
        )
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})