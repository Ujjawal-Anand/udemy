import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import UserQuery from '../queries/CurrentUser';
import LogoutMutation from '../mutations/LogoutUser';

class Header extends Component {

    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [
                { query: UserQuery }
            ]
        });
    }

    renderButtons() {
        // console.log(this.props);
        const {User, loading} = this.props.data;
        if(loading) { return <div />; }
        if (User) {
            return (
                <li>
                    <a onClick={() => this.onLogoutClick()}>Logout</a>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="login">Login</Link>
                    </li>
                    <li>
                        <Link to="signup">Signup</Link>
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