import React, { Component } from 'react';


class AuthUser extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: ""};
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);

    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                
                <input placeholder="Email" onChange={e => this.setState({email: e.target.value})}
                    value={this.state.email} />
                
                <input placeholder="Password" type="password" 
                onChange={e => this.setState({password: e.target.value})}
                    value={this.state.password} />
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default AuthUser;