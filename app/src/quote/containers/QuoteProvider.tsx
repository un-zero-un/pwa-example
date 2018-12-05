import React, {PureComponent, ReactNode} from 'react';
import {Query, QueryResult} from 'react-apollo';

import query from '../queries/getQuoteBySlug';
import {Quote, QuoteConnection} from "../types/Quote";
import {Helmet} from "react-helmet";
import LoaderIndicator from "../../core/components/LoaderIndicator";

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
                        return <LoaderIndicator />;
                    }

                    if (!data.quotes) {
                        return null;
                    }

                    const quote = data.quotes.edges[0].node;

                    return (
                        <>
                            <Helmet>
                                <title>{quote.title} — PWA Fortunes</title>
                                <meta name="description" content={quote.title + "\n" + quote.text.substr(0, 200) + '…'} />
                            </Helmet>

                            {this.props.render({quote: quote})}
                        </>
                    );
                }}
            </Query>
        );
    }
}

