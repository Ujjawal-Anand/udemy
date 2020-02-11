import React, { Component } from 'react';
import AuthUser from './AuthUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import LoginUser from '../mutations/LoginUser';
import CurrentUserQuery from '../queries/CurrentUser'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {errors: []};
    }

    componentWillUpdate(nextProps) {
        // this.props //the old, current, set of props
        // nextProps // the next set of props that will be in place
        // when component rerenders
        if(!this.props.data.User && nextProps.data.User) {
            hashHistory.push('/dashboard');
        }
    }
    
    onSubmit({email, password }) {
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [
                {query: CurrentUserQuery}
            ]
        }).catch(res => { const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors })});
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <AuthUser onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
            </div>
        )
    }
}

export default graphql(CurrentUserQuery)(
    graphql(LoginUser)(Login)
);