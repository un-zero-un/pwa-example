import React, {PureComponent, ReactNode} from 'react';
import {ChildProps, graphql} from 'react-apollo';

import query from '../queries/getQuotes';
import {QuoteConnection, QuoteEdge} from "../types/Quote";
import LoaderIndicator from "../../core/components/LoaderIndicator";

type Response = { quotes: QuoteConnection };
type OwnProps = {
    render: (props: {quotes: QuoteEdge[]}) => ReactNode
};
type Props = ChildProps<OwnProps, Response>;

class QuoteListProvider extends PureComponent<Props> {
    render() {
        if (!this.props.data) {
            return null;
        }

        if (this.props.data.loading) {
            return <LoaderIndicator />;
        }

        if (!this.props.data.quotes) {
            return null;
        }

        return this.props.render({quotes: this.props.data.quotes.edges});
    }
}


export default graphql<OwnProps, Response>(query)(QuoteListProvider);
