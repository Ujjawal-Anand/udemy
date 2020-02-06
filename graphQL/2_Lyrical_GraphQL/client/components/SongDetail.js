import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongDetail extends Component {

    renderSongDetail() {
        console.log(this.props);
    }

    renderLyrics(lyrics) {
        return lyrics.map(({id, likes, content }) => {
            return (
            <li key={id} className="collection-item">
                {content}
                <i className="material-icons">Like</i>
            </li>
            );
        } );
    }

    render() {
        console.log(this.props);
        return (
            <div>
               Song Detail
            </div>

        );
    }
}

const fetchSong = gql`
    query SongQuery($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                likes
                content
            }
        }
    }
`;

export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id }}}
})(SongDetail);

