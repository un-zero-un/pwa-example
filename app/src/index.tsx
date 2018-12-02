import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {persistCache} from 'apollo-cache-persist';
import {PersistedData, PersistentStorage} from 'apollo-cache-persist/types';
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {BrowserRouter as Router} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from "./core/containers/App";
import reducer from './core/reducers';

import './index.css';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

declare global {
    interface Window {
        __REDUX_STATE?: any;
        __APOLLO_STATE?: any;
    }
}


let middleware = [];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(reducer, window.__REDUX_STATE || undefined, applyMiddleware(...middleware));
const cache = new InMemoryCache();

if (window.__APOLLO_STATE) {
    cache.restore(window.__APOLLO_STATE);
}

persistCache({cache, storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>});

const apolloClient = new ApolloClient({
    cache: cache,
    link: new HttpLink({uri: process.env.REACT_APP_API_ENTRYPOINT + '/graphql'}),
});

const renderMethod = window.__REDUX_STATE ? ReactDOM.hydrate : ReactDOM.render;
const theme = createMuiTheme({typography: {useNextVariants: true}});

renderMethod(
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <App/>
                </MuiThemeProvider>
            </Router>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);



serviceWorker.register();
