import React from 'react';
import UserCreate from './UserCreate';
import LanguagSelector from './LanguageSelector'
import LanguageContext from '../contexts/LanguageContext'
import ColorContext from '../contexts/ColorContext'
import LanguageSelector from './LanguageSelector';

class App extends React.Component {
    state = {language: 'english'}
    onLanguageChange = language => {
        this.setState({language});
    }
    render() {
        return (
            <div className="ui container">
                
                <LanguageContext.Provider value={this.state.language}>
                    <LanguageSelector onLanguageChange = {this.onLanguageChange} />
                    <ColorContext.Provider value='red'>
                        <UserCreate />
                    </ColorContext.Provider>
                </LanguageContext.Provider>
            </div>
        );
    }
}

export default App;
