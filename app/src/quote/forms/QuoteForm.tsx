import React from 'react';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import {createStyles, List, ListItem, Paper, Theme, WithStyles, withStyles} from '@material-ui/core';

import {Quote} from "../types/Quote";
import {TextField} from "../../core/forms/material";

type Errors = { [path: string]: string };
type Props = { errors?: Errors }

interface FormProps extends InjectedFormProps<Quote, Props>, WithStyles, Props {
};

const styles = (theme: Theme) => createStyles({
    root: {
        ...theme.mixins.gutters(),
        margin: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },

    list: {
        width: '100%',
    }
});

const QuoteForm = ({handleSubmit, pristine, submitting, classes}: FormProps) => (
    <Paper elevation={2} className={classes.root}>
        <List component="form" onSubmit={handleSubmit} className={classes.list}>
            <ListItem>
                <Field name="author" component={TextField} label="Author"/>
            </ListItem>

            <ListItem>
                <Field name="title" component={TextField} label="Title"/>
            </ListItem>

            <ListItem>
                <Field name="text" component={TextField} label="Text"/>
            </ListItem>

            <ListItem>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </ListItem>
        </List>
    </Paper>
);

export default reduxForm<Quote, Props>({form: 'quote'})(withStyles(styles)(QuoteForm));
