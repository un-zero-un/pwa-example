import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Divider, List, ListItem, ListItemText, Typography} from "@material-ui/core";

import {QuoteEdge} from "../types/Quote";

import '../styles/QuoteList.scss';

type Props = {
    quotes: QuoteEdge[],
}

export default ({quotes}: Props) => (
    <>
        <List className="QuoteList">
            {quotes.map(edge => (
                <Fragment key={edge.node.id}>
                    <ListItem component="blockquote" className="QuoteList__item">
                        <ListItemText>
                            <Link to={`/quotes/${edge.node.slug}`}>
                                <Typography variant="h4">
                                    {edge.node.title}
                                </Typography>
                            </Link>
                            <p>
                                {edge.node.text.substr(0, 200) + (edge.node.text.length > 200 ? '…' : '')}
                            </p>
                            <cite>{edge.node.author}</cite>
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                </Fragment>
            ))}
        </List>
    </>
);
