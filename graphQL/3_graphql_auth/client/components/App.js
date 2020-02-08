import React, { Component } from 'react';

import Header from './Header'

class App extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <Header />
                <h1>Welcome</h1>
            </div>
        )
    }
}

export default App;