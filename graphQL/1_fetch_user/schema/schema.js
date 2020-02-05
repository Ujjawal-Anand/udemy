const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

const axios = require('axios');

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () =>  ({  // using arrow function to resolve circular reference to UserType
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: new GraphQLList(UserType), // not just UserList as returns multiple values
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(resp => resp.data)
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(resp => resp.data)
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryObjectType',
    fields: () => ({
        user: {
        type: UserType,
        args: {id: {type: GraphQLString} },
        // This is where graphql fetches data
        resolve(parentValue, args) {
            return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(resp => resp.data)
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(resp => resp.data)
            }

        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});