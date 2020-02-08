import React, { Component } from 'react';

import Header from './Header'

const App = (props) => {
    return (
        <div className="container">
            <Header />
            {props.children}
            <h3>Welcome</h3>
        </div>
    );
};

export default App;