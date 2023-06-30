const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLID, GraphQLList } = require('graphql')
const { TagType } = require('./tagType')

const CalendarItemType = new GraphQLObjectType({
  name: 'CalendarItem',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    backgroundColor: { type: GraphQLString },
    value: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    tags: { type: GraphQLList(TagType)}
  })
})

const CalendarDayDescriptionType = new GraphQLObjectType({
  name: 'CalendarDayDescription',
  fields: () => ({
    title: { type: GraphQLString },
    subTitle: { type: GraphQLString },
  })
})

const CalendarDayItemType = new GraphQLObjectType({
  name: 'CalendarDayItem',
  fields: () => ({
    date: { type: GraphQLFloat },
    description: { type: CalendarDayDescriptionType },
    items: { type: GraphQLList(CalendarItemType) },
  })
})

module.exports = CalendarDayItemType