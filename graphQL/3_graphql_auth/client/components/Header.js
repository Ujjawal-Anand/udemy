import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import UserQuery from '../queries/CurrentUser';
import LogoutMutation from '../mutations/LogoutMutation';

class Header extends Component {

    onLogoutClick() {
        this.props.muatate({});
    }

    renderButtons() {
        // console.log(this.props.data);
        const {User, loading} = this.props.data;
        if(loading) { return <div />; }
        if (User) {
            return (
                <li>
                    <a onClick={this.onLogoutClick().binnd(this)}>Logout</a>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="signin">SignIn</Link>
                    </li>
                    <li>
                        <Link to="signup">SignUp</Link>
                    </li>
                </div>
            );
        }
    };

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default graphql(LogoutMutation)(
    graphql(UserQuery)(Header));