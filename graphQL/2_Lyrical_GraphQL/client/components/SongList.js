import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongQuery from '../queries/fetchSongQuery';

class SongList extends Component {
    renderSongList() {
       return this.props.data.songs.map(song => {
           return (
           <li key={song.id} className="collection-item">
               { song.title }
           </li>
           );
       });
    };

    render() {
        if(this.props.data.loading) return <div>Loading</div>;

        return (
            <div>
                <h3>Song List </h3>
                <ul className="collection">
                    {this.renderSongList()}
                </ul>
                <Link to='songs/new' className='btn-floating btn-large green right'>
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}



export default graphql(fetchSongQuery)(SongList);