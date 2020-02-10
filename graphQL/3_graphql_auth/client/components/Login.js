import React, { Component } from 'react';
import AuthUser from './AuthUser';
import { graphql } from 'react-apollo';

import LoginUser from '../mutations/LoginUser';


class Login extends Component {
    onSubmit(email, password) {
        this.props.muatate({
            variables: {
                email,
                password
            }
        })
    }

    render() {
        return (
            <div>
                <AuthUser onSubmit={this.onSubmit(email, password)} />
            </div>
        )
    }
}

export default graphql(LoginUser)(Login);