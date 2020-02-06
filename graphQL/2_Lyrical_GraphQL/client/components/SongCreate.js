import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongQueries from '../queries/fetchSongQuery'

class SongCreate extends Component {
    constructor(props) {
        super(props);

       this.state = {title: ''};
    }

    onSubmit(event) {
        event.preventDefault(); // to prevent auto submit when form renders
        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{query: fetchSongQueries }] // this will update songs in SongList
        }).then(() => hashHistory.push('/'))
            .catch(() => {});
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title</label>
                    <input onChange = {event => this.setState({title: event.target.value})} 
                        value= {this.state.title}/>
                </form>
            </div>
        );
    }
}

// challenge: to get title of song from inside of SongCreate
// Query Variables: Used to inject some variables from outside of 
// query into the query
const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) { 
            id
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);