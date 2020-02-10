import gql from 'graphql-tag';

export default gql`
query Login($email: String, $password: String) {
    login(email:$email, password: $password) {
        id
        email
    }
}`