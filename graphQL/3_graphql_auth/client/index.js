import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo'
import {Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="signIn/" component={SignIn} />
          <Route path="signOut/" component={SignOut} />
        </Route>
      </Router>
    </ApolloProvider>
    
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
