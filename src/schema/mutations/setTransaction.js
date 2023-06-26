const { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLFloat } = require('graphql')
const UserType = require('../userType')
const User = require('../../models/User')
const { TagInputType } = require('../tagType')

const setTransaction = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
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
    if (args.typeTo === "expenses") {
      return (
        User.updateOne(
          {_id: args.id },
          {
            $inc: {
              "accounts.$[element].value": -args.value,
              "expenses.$[elemTo].value": args.value
            },
            $addToSet: {
              transactions: {
                idFrom: args.idFrom,
                typeFrom: args.typeFrom,
                typeTo: args.typeTo,
                idTo: args.idTo,
                value: args.value,
                comment: args.comment,
                date: args.date,
                tags: args.tags
              },
            },
          },
          {
            arrayFilters: [
              { "element._id": args.idFrom },
              { "elemTo._id": args.idTo },
            ]
          }
        )
      )
    } else if (args.typeTo === "accounts" && args.typeFrom === "incomes") {
      return (
        User.updateOne(
          {_id: args.id },
          {
            $inc: {
              "incomes.$[element].value": args.value,
              "accounts.$[elemTo].value": args.value
            },
            $addToSet: {
              transactions: {
                idFrom: args.idFrom,
                typeFrom: args.typeFrom,
                typeTo: args.typeTo,
                idTo: args.idTo,
                value: args.value,
                comment: args.comment,
                date: args.date,
                tags: args.tags
              },
            },
          },
          {
            arrayFilters: [
              { "element._id": args.idFrom },
              { "elemTo._id": args.idTo },
            ]
          }
        )
      )
    } else if (args.typeTo === "accounts" && args.typeFrom === "accounts") {
      return (
        User.updateOne(
          {_id: args.id },
          {
            $inc: {
              "accounts.$[element].value": -args.value,
              "accounts.$[elemTo].value": args.value
            },
            $addToSet: {
              transactions: {
                idFrom: args.idFrom,
                typeFrom: args.typeFrom,
                typeTo: args.typeTo,
                idTo: args.idTo,
                value: args.value,
                comment: args.comment,
                date: args.date,
                tags: args.tags
              },
            },
          },
          {
            arrayFilters: [
              { "element._id": args.idFrom },
              { "elemTo._id": args.idTo },
            ]
          }
        )
      )
    }
  }
}

module.exports = setTransaction
