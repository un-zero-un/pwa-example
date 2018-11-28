import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-boost";

import * as serviceWorker from './serviceWorker';
import App from "./core/containers/App";
import reducer from './core/reducers';

import './index.css';

let middleware = [];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
const apolloClient = new ApolloClient({
    uri: process.env.REACT_APP_API_ENTRYPOINT + '/graphql'
});


ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={apolloClient}>
            <App/>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

