## Section - 23 The Context System With React
[Course Link](https://www.udemy.com/course/react-redux/learn/lecture/12823387?start=30#overview)

- Context is all about communicating information between different components much like props system, only different is - 
![image](screenshots/1.png)
![image](screenshots/2.png) ![image](screenshots/3.png)


### App Layout
![AppLayout](screenshots/4.png)
Clicking on flags will change the text in button and form to the country's language.

Using props system
![AppLayout](screenshots/5.png)

Using Context System
![AppLayout](screenshots/6.png)

Think of Context System as a pipeline. There are two ways to get information in and out of this pipeline!
![context pipeline](screenshots/7.png)

Ways to get data in :
    - Default value
    - Provider

ways to get data out :
    - using this.context
    - using Consumer
![context pipeline](screenshots/8.png)

**Creating a Context**
*context/LanguageContext.js*
```javascript
import React from 'react';

export default React.createContext('english);
```

**Getting data out using this.context**
![](screenshots/9.png)
*components/Button.js*
```javascript
import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Button extends React.Component {
    static contextType = LanguageProvider;
    // The contextType is a special property name, 
    // if you call this anything else, this won't work!

    // use of 'static' means we are adding a property to
    // class itself and not creating any local version of it
    render() {
        const text = this.context=== 'english' ? 'Submit' : 'प्रस्तुत';
        return (
            <button class="ui button primary">{text}</button>
        );
    }
}

// Button.contextType = LanguageProvider
// This will work as well

export default Button;
```

**Sending data using provider**
*src/App.js*
```javascript
import LanguageContext from '../contexts/LanguageContext'
...
...
render() {
    return (
        <div className="ui container">
                ...
                ...
                <LanguageContext.Provider value={this.state.language}>
                    <UserCreate />
                </LanguageContext.Provider>
            </div>
    );
}

export default App;
```

![context pipeline](screenshots/10.png)
![context pipeline](screenshots/11.png)
![context pipeline](screenshots/12.png)

**Getting data out using consumer**
*components/Button.js*
```javascript
import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Button extends React.Component {
    renderSubmit(value) {
        return value === 'english' ? 'Submit' : 'प्रस्तुत';
    }
    render() {
        
        return (
            <button class="ui button primary">
                <LanguageContext.Consumer>
                    {(value) => this.renderSubmit(value)}
                </LanguageContext.Consumer>
            </button>
        );
    }
}

export default Button;
```


