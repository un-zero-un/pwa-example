import React from 'react';
import {AppBar, createStyles, IconButton, Theme, Toolbar, Typography, withStyles, WithStyles} from "@material-ui/core";
import {Apps as AppsIcon} from "@material-ui/icons";
import {RouteComponentProps, withRouter} from "react-router";

const styles = (theme: Theme) => createStyles({
    appBar: {
        position: 'relative',
    },
    icon: {
        color: theme.palette.background.paper,
    },
    title: {
        color: theme.palette.background.paper,
    },
    link: {
        textDecoration: 'none',
    }
});

interface Props extends WithStyles, RouteComponentProps {

}

export default withRouter(withStyles(styles)(({classes, history}: Props) => (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
        <Toolbar>
            <IconButton onClick={() => { history.push('/'); }}>
                <AppsIcon className={classes.icon}/>
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
                PWA — SSR — Demo
            </Typography>
        </Toolbar>
    </AppBar>
)));
