import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo'
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'
import requireAuth from './components/requireAuth'


// This attaches cookies with request
const networkInterface = new createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="Login" component={Login} />
          <Route path="signup" component={SignUp} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
    
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
