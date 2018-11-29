import * as React from "react";

import {QuoteEdge} from "../types/Quote";
import {Link} from "react-router-dom";

type Props = {
    quotes: QuoteEdge[],
}

export default ({quotes}: Props) => (
    <>
        <h2>Quote list</h2>
        <section>
            {quotes.map((edge) => (
                <blockquote key={edge.node.id}>
                    <h3>
                        <Link to={`/quotes/${edge.node.slug}`}>
                            {edge.node.title}
                        </Link>
                    </h3>
                    <p>
                        {edge.node.text}
                    </p>
                    <cite>{edge.node.author}</cite>
                </blockquote>
            ))}
        </section>
    </>
);
