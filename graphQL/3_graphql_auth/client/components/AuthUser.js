import React, { Component } from 'react';


class AuthUser extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }

    onSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Email:</label>
                <input onChange={e => this.setState({email: e.target.value})}
                    value={this.state.email} />
                <label>Password:</label>
                <input onChange={e => this.setState({password: e.target.value})}
                    value={this.state.password} />
            </form>
        );
    }
}

export default AuthUser;