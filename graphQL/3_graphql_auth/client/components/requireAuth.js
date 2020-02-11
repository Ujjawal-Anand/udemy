import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import CurrentUserQuery from '../queries/CurrentUser'

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        
        componentWillUpdate(nextProps) {
            
            if(!nextProps.data.loading && !nextProps.data.User) {
                hashHistory.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(CurrentUserQuery)(RequireAuth);
};