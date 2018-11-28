import React, {Component} from 'react';
import '../styles/App.scss';

import QuoteList from "../../quote/components/QuoteList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <QuoteList />
            </div>
        );
    }
}

export default App;
