import React, { Component } from 'react';


class LyricsList extends Component {
    
    renderLyricsList() {
        return this.props.lyrics.map(({id, content}) => {
            return (
            <li key={id} className="collection-item">
                {content}
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

export default LyricsList;