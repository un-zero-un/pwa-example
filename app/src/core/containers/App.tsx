import React, {Component} from 'react';
import {Redirect, Route} from 'react-router';
import {Helmet} from 'react-helmet';

import QuoteListProvider from "../../quote/containers/QuoteListProvider";
import QuoteList from "../../quote/components/QuoteList";
import Quote from "../../quote/components/Quote";
import QuoteProvider from "../../quote/containers/QuoteProvider";

import '../styles/App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Helmet>
                    <title>PWA Fortunes</title>
                    <meta name="description" content="A Progressive Web Application demo" />
                </Helmet>
                <header>
                    <h1>Fortunes quotes</h1>
                </header>
                <main>
                    <Route exact path="/" render={() => <Redirect to="/quotes"/>} />
                    <Route exact path="/quotes" render={() => <QuoteListProvider render={props => <QuoteList {...props} />} />} />
                    <Route exact path="/quotes/:slug" render={({match}) => <QuoteProvider slug={match.params.slug} render={props => <Quote {...props} />} />} />
                </main>
            </div>
        );
    }
}

export default App;
