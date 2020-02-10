import gql from 'graphql-tag';

export default gql`
mutation SignupUser($email: String, $password: String) {
    signup(email: $email, password: $password) {
        id
        email
    }
}`;