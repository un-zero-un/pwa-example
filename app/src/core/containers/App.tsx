import React, {Component} from 'react';
import {Redirect, Route} from "react-router";

import QuoteListProvider from "../../quote/containers/QuoteListProvider";
import QuoteList from "../../quote/components/QuoteList";

import '../styles/App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => <Redirect to="/quotes"/>} />
                <Route exact path="/quotes" render={() => <QuoteListProvider render={props => <QuoteList {...props} />} />} />
            </div>
        );
    }
}

export default App;
