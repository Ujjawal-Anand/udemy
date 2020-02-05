const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const axios = require('axios');


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
            return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(resp => resp.data)
        }
    }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});