import React, {Component} from 'react';
import {Redirect, Route} from "react-router";

import QuoteListProvider from "../../quote/containers/QuoteListProvider";
import QuoteList from "../../quote/components/QuoteList";

import '../styles/App.scss';
import Quote from "../../quote/components/Quote";
import QuoteProvider from "../../quote/containers/QuoteProvider";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => <Redirect to="/quotes"/>} />
                <Route exact path="/quotes" render={() => <QuoteListProvider render={props => <QuoteList {...props} />} />} />
                <Route exact path="/quotes/:slug" render={({match}) => <QuoteProvider slug={match.params.slug} render={props => <Quote {...props} />} />} />
            </div>
        );
    }
}

export default App;
