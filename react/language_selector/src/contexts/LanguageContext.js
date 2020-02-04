import React from 'react';

const Context = React.createContext('english');

export class LanguageStore extends React.Component {
    state = {language : 'english'};

    onLanguageChange = (language) => {
        this.setState({language});
    }

    render() {
        return (
            <Context.Provider value = {{...this.state, onLanguageChange: this.onLanguageChange }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
// has to be Context and not context, as this is how jsx distinguish between a component and html tag


export default Context;