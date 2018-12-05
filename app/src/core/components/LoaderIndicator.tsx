import React from 'react';
import {CircularProgress} from "@material-ui/core";

import '../styles/LoaderIndicator.scss';

export default () => (
    <div className="LoaderIndicator">
        <CircularProgress
            thickness={2}
            className="LoaderIndicator__circularProgress"
            size={100}
        />
    </div>
);
