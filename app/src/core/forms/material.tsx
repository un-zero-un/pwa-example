import React from 'react';
import {TextField as MaterialTextField} from '@material-ui/core';
import {WrappedFieldProps} from 'redux-form';

type MaterialFieldProps = WrappedFieldProps & { label: string };

export const TextField = ({input, label, meta: {touched, error}, ...custom}: MaterialFieldProps) => (
    <MaterialTextField helperText={(error || []).join(' ')} label={label} error={touched && error} {...input} {...custom} />
);
