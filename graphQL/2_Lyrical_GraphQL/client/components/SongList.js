import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongQuery from '../queries/fetchSongQuery';

class SongList extends Component {
    
    onSongDelete(id) {
        this.props.mutate({
            variables: {id} })
            .then(() => this.props.data.refetch()); // notice: different than process in SongCreate
    }

    renderSongList() {
       return this.props.data.songs.map(({id, title}) => {
           return (
           <li key={id} className="collection-item">
               <Link to={`songs/${id}`}>
                 { title }
               </Link>
               <i className="material-icons"
               onClick= {() => this.onSongDelete(id)}>
                   delete
               </i>
           </li>
           );
       });
    };

    render() {
        if(this.props.data.loading) return <div>Loading</div>;

        return (
            <div>
                <h3>Song List</h3>
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

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;



// export default graphql(fetchSongQuery, mutation)(SongList);
// This won't work as graphql function doesn't accept multiple parameter

export default graphql(mutation) (
    graphql(fetchSongQuery)(SongList)
);