import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import LyricsCreate from '../components/LyricsCreate';
import LyricsList from '../components/LyricsList';

class SongDetail extends Component {

    renderSongDetail() {
        console.log(this.props);
    }

    render() {
        const { song } = this.props.data;
        if (!song) return <div>Loading ... </div>;
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricsList lyrics={song.lyrics} />
                <LyricsCreate songId={song.id} />
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

