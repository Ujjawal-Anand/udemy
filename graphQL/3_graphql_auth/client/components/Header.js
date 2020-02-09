import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import UserQuery from '../queries/CurrentUser'

class Header extends Component {

    renderButtons() {
        // console.log(this.props.data);
        const {User, loading} = this.props.data;
        if(loading) { return <div />; }
        if (User) {
            return (
                <li>
                    Signout
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="signout">SignIn</Link>
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

export default graphql(UserQuery)(Header);