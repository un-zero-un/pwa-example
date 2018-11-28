import * as React from "react";

import {QuoteEdge} from "../types/Quote";

type Props = {
    quotes: QuoteEdge[],
}

export default ({quotes}: Props) => (
    <section>
        {quotes.map(edge => (
            <blockquote key={edge.node.id}>
                <h3>{edge.node.title}</h3>
                <p>
                    {edge.node.text}
                </p>
                <cite>{edge.node.author}</cite>
            </blockquote>
        ))}
    </section>
);
