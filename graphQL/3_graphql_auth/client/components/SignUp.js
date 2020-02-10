import React, {Component} from 'react';
import { graphql } from 'react-apollo'

import AuthUser from './AuthUser';
import SignupMutation from '../mutations/SignupUser'

class SignUp extends Component {
    
    onSubmit({email, password}) {
        this.props.mutate({
            variables: {
                email,
                password
            }
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