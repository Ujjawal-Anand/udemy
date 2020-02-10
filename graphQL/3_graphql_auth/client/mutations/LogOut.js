import gql from 'apollo-tag';

export gql`
    muatation {
        logout {
            id
            email
        }
    }
`;