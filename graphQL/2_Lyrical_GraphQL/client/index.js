import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
// react-apollo library provides integration b/n apollo-client and react
import { ApolloProvider } from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import SongList from './components/SongList';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
