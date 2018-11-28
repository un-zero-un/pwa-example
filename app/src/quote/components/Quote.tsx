import React from 'react';

import {Quote} from "../types/Quote";

type Props = {
    quote: Quote,
};

export default ({quote}: Props) => (
    <blockquote>
        <h3>{quote.title}</h3>
        <p>
            {quote.text}
        </p>
        <cite>{quote.author}</cite>
    </blockquote>
);
