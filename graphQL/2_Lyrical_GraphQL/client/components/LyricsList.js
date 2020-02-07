import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricsList extends Component {

    likeLyric(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: "LyricType",
                    likes: likes+1
            }
        }
        })
    }
    
    renderLyricsList() {
        return this.props.lyrics.map(({id, content, likes}) => {
            return (
            <li key={id} className="collection-item">
                {content}

            <div className="vote-box">
                <i className="material-icons" onClick={()=> this.likeLyric(id, likes) }>thumb_up</i>
                {likes}
            </div>
            </li>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="collection">
                    {this.renderLyricsList()}
                </ul>
            </div>
        );
    }
}

const mutation = gql`mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }`;

export default graphql(mutation)(LyricsList);