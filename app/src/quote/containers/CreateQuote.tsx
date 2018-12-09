import React, {Component} from "react";
import QuoteForm from "../forms/QuoteForm";
import {Quote} from "../types/Quote";
import {Mutation} from "react-apollo";

export default class CreateQuote extends Component<{}> {
    render() {
        return (
            <Mutation mutation={require('../mutations/createQuote.graphql')}>
                {(createTodo) => (
                    <QuoteForm onSubmit={(quote: Quote) => createTodo({variables: quote})} />
                )}
            </Mutation>
        );
    }
}

