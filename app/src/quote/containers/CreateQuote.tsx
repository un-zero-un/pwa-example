import {FetchResult, Mutation} from "react-apollo";
import {GraphQLError} from "graphql";
import {SubmissionError} from "redux-form";
import React, {Component} from "react";

import QuoteForm from "../forms/QuoteForm";
import {Quote} from "../types/Quote";
import {RouteComponentProps, withRouter} from "react-router";

class CreateQuote extends Component<RouteComponentProps> {
    render() {
        return (
            <Mutation<{createQuote: Quote}, Quote> mutation={require('../mutations/createQuote.graphql')} update={(cache) => {
                
            }}>
                {
                    createTodo => {
                        return <QuoteForm onSubmit={async (quote) => {
                            try {
                                const res = await createTodo({variables: quote}) as any;
                                const newQuote = res.data.createQuote;

                                this.props.history.push('/quotes/' + newQuote.slug);
                            } catch (e) {
                                const errors = e.graphQLErrors.reduce(
                                    (memo: { [path: string]: string }, error: GraphQLError) => {
                                        const message = error.message.split(/: /);

                                        return ({
                                            ...memo,
                                            [message[0]]: [message[1]],
                                        })
                                    },
                                    {}
                                );

                                throw new SubmissionError<Quote>(errors);
                            }
                        }}/>
                    }
                }
            </Mutation>
        );
    }
}

export default withRouter(CreateQuote);
