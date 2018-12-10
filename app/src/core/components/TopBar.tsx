import React from 'react';
import {AppBar, createStyles, IconButton, Theme, Toolbar, Typography, withStyles, WithStyles} from "@material-ui/core";
import {Add as AddIcon, Apps as AppsIcon} from "@material-ui/icons";
import {RouteComponentProps, withRouter} from "react-router";
import {Link} from "react-router-dom";

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

interface Props extends WithStyles, RouteComponentProps {}

export default withRouter(withStyles(styles)(({classes}: Props) => (
    <AppBar position="sticky" color="primary" className={classes.appBar}>
        <Toolbar>
            <IconButton component={(props: {}) => <Link to="/" {...props} />}>
                <AppsIcon className={classes.icon}/>
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
                PWA — SSR — Demo
            </Typography>
            <IconButton component={(props: {}) => <Link to="/quotes/create" {...props} />}>
                <AddIcon className={classes.icon}/>
            </IconButton>
        </Toolbar>
    </AppBar>
)));
