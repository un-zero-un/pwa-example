import React from 'react';
import {reduxForm, InjectedFormProps, Field} from "redux-form";
import {connect} from "react-redux";

import {Quote} from "../types/Quote";

type Errors = { [path: string]: string };
type Props = {
    errors?: Errors
}

type FormProps = InjectedFormProps<Quote, Props> & Props;

const QuoteForm = ({handleSubmit, pristine, submitting, errors}: FormProps) => {
    console.log(pristine, submitting, errors);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="author">Author</label>
                <Field name="author" component="input" type="text" disabled={submitting} />
            </div>
            <div>
                <label htmlFor="author">Title</label>
                <Field name="title" component="input" type="text" disabled={submitting} />
            </div>
            <div>
                <label htmlFor="author">Text</label>
                <Field name="text" component="input" type="text" disabled={submitting} />
            </div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
        </form>
    );
};

export default reduxForm<Quote, Props>({form: 'quote'})(connect(
    (state: { form: { quote?: { submitErrors?: Errors } } }) => ({
        errors: state.form.quote ? state.form.quote.submitErrors : {},
    })
)(QuoteForm));
