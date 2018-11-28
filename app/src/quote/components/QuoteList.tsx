import React, {PureComponent} from 'react';
import { graphql } from 'react-apollo';

import query from '../queries/getQuotes.graphql';

console.log(require('../queries/getQuotes.graphql'));

type Props = {};

class QuoteList extends PureComponent<Props> {
    render() {
        return 'Coucou';
    }
}


export default graphql(query)(QuoteList);
