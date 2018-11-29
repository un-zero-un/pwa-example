import React, {Component} from 'react';
import {Route} from 'react-router';
import {Helmet} from 'react-helmet';
import {CssBaseline} from '@material-ui/core';

import QuoteListProvider from "../../quote/containers/QuoteListProvider";
import QuoteList from "../../quote/components/QuoteList";
import Quote from "../../quote/components/Quote";
import QuoteProvider from "../../quote/containers/QuoteProvider";
import TopBar from "../components/TopBar";

import '../styles/App.scss';

class App extends Component {
    render() {
        return (
            <>
                <CssBaseline/>
                <div className="App">
                    <Helmet>
                        <title>PWA Fortunes</title>
                        <meta name="description" content="A Progressive Web Application demo"/>
                    </Helmet>

                    <TopBar/>

                    <main>
                        <Route exact path="/"
                               render={() => <QuoteListProvider render={props => <QuoteList {...props} />}/>}/>
                        <Route exact path="/quotes/:slug"
                               render={({match}) => <QuoteProvider slug={match.params.slug} render={props => <Quote {...props} />}/>}/>
                    </main>
                </div>
            </>
        );
    }
}

export default App;
