import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricsCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {content : ''};
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content
            }
        }).then(() => this.setState({content: ''}));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} >
                    <label>Add Lyrics</label>
                    <input onChange={event => this.setState({content: event.target.value}) }
                        value={this.state.content} />
                </form>
            </div>
        );
    }
}

const mutation = gql`
        mutation AddLyrics($content: String, $songId: ID) {
            addLyricToSong(content: $content, songId: $songId ) {
                id
                title
                lyrics {
                    id
                    content
                }
            }
        }
`;

export default graphql(mutation)(LyricsCreate);