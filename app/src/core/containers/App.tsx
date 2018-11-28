import React, {Component} from 'react';
import '../styles/App.scss';

import QuoteListProvider from "../../quote/containers/QuoteListProvider";
import QuoteList from "../../quote/components/QuoteList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <QuoteListProvider render={props => <QuoteList {...props} />} />
            </div>
        );
    }
}

export default App;
