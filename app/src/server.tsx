import React from 'react';
import {renderToString} from 'react-dom/server';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {ApolloProvider, getDataFromTree} from "react-apollo";
import ApolloClient from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import fetch from 'node-fetch';
import {StaticRouter as Router} from 'react-router';
import Helmet from "react-helmet";

import App from "./core/containers/App";
import reducer from './core/reducers';

module.exports = (url: string) => {
    const store = createStore(reducer);
    const apolloClient = new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache({}),
        link: createHttpLink({
            fetch: fetch as unknown as GlobalFetch['fetch'],
            uri: process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT + '/graphql',
        }),
    });
    const context = {};
    const Tree = (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Router location={url} context={context}>
                    <App/>
                </Router>
            </ApolloProvider>
        </Provider>
    );

    return getDataFromTree(Tree)
        .then(() => {
            const content = renderToString(Tree);
            const helmet = Helmet.renderStatic();

            return {
                content,
                helmet,
                state: store.getState(),
                apolloState: apolloClient.extract(),
            };
        });
};
