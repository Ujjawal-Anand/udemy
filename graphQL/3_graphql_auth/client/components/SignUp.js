import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router';

import AuthUser from './AuthUser';
import SignupMutation from '../mutations/SignupUser'
import CurrentUserQuery from '../queries/CurrentUser'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {errors: []};
    }

    componentWillUpdate(nextProps) {
        if(!this.props.data.User && nextProps.data.User) {
            hashHistory.push('/dashboard');
        }
    }
    
    onSubmit({email, password}) {
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
                <h2>Signup</h2>
                <AuthUser errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(CurrentUserQuery)(graphql(SignupMutation)(SignUp));