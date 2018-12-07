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
import Helmet from 'react-helmet';
import {SheetsRegistry} from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles';

import App from "./core/containers/App";
import reducer from './core/reducers';


export const ssr = (endpoint: string, url: string) => {
    const store = createStore(reducer);
    const apolloClient = new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache({}),
        link: createHttpLink({
            fetch: fetch as unknown as GlobalFetch['fetch'],
            uri: endpoint + '/graphql',
        }),
    });

    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const theme = createMuiTheme({typography: {useNextVariants: true}});
    const generateClassName = createGenerateClassName();
    const context = {};
    const Tree = (
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Router location={url} context={context}>
                    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                            <App/>
                        </MuiThemeProvider>
                    </JssProvider>
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
                css: sheetsRegistry.toString(),
                state: store.getState(),
                apolloState: apolloClient.extract(),
            };
        });
};
