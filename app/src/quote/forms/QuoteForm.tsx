import React from 'react';
import {reduxForm, InjectedFormProps, Field} from "redux-form";
import {Quote} from "../types/Quote";

type Props = {

}

type FormProps = InjectedFormProps<Quote, Props> & Props;

const QuoteForm = ({handleSubmit}: FormProps) => (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="author">Author</label>
            <Field name="author" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="author">Title</label>
            <Field name="title" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="author">Text</label>
            <Field name="text" component="input" type="text" />
        </div>
        <button type="submit">Submit</button>
    </form>
);

export default reduxForm<Quote, Props>({form: 'quote'})(QuoteForm);
