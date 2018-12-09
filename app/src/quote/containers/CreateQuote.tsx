import {Mutation} from "react-apollo";
import {GraphQLError} from "graphql";
import {SubmissionError} from "redux-form";
import React, {Component} from "react";

import QuoteForm from "../forms/QuoteForm";
import {Quote} from "../types/Quote";

export default class CreateQuote extends Component<{}> {
    render() {
        return (
            <Mutation mutation={require('../mutations/createQuote.graphql')}>
                {
                    createTodo => {
                        return <QuoteForm onSubmit={async (quote: Quote) => {
                            try {
                                const res = await createTodo({variables: quote});

                                console.log('THE RESP');
                                console.log(res);
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

