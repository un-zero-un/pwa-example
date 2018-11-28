import React, {PureComponent, ReactNode} from 'react';
import {Query, QueryResult} from 'react-apollo';

import query from '../queries/getQuoteBySlug';
import {Quote, QuoteConnection} from "../types/Quote";

type Props = {
    slug: string,
    render: (props: { quote: Quote }) => ReactNode
};

export default class QuoteProvider extends PureComponent<Props> {
    render() {
        return (
            <Query query={query} variables={{slug: this.props.slug}}>
                {({data, loading, error}: QueryResult<{quotes: QuoteConnection}>) => {
                    if (!data) {
                        return null;
                    }

                    if (loading) {
                        return null;
                    }

                    if (!data.quotes) {
                        return null;
                    }

                    return this.props.render({quote: data.quotes.edges[0].node});
                }}
            </Query>
        );
    }
}

