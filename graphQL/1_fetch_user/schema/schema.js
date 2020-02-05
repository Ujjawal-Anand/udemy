const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const _ = require('lodash');

const users = [
    {id: '1', firstName: 'Ujjawal', age: 23},
    {id: '2', firstName: 'Anand', age: 24}
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryObjectType',
    fields: {
        user: {
        type: UserType,
        args: {id: {type: GraphQLString} },
        // This is where graphql fetches data
        resolve(parentValue, args) {
            return _.find(users, {id: args.id});
        }
    }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});