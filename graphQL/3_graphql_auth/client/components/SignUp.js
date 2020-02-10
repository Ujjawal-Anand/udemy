import React, {Component} from 'react';
import { graphql } from 'react-apollo'

import AuthUser from './AuthUser';
import SignupMutation from '../mutations/SignupUser'
import CurrentUserQuery from '../queries/CurrentUser'

class SignUp extends Component {
    
    onSubmit({email, password}) {
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [
                {query: CurrentUserQuery}
            ]
        })
    }
    render() {
        return (
            <div>
                <h2>Signup</h2>
                <AuthUser onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(SignupMutation)(SignUp);