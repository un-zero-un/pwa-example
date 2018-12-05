import React from 'react';

import {Quote} from "../types/Quote";

import '../styles/Quote.scss';

type Props = {
    quote: Quote,
};

export default ({quote}: Props) => (
    <blockquote className="Quote">
        <h3 className="Quote__title">{quote.title}</h3>
        <p className="Quote__text">
            {quote.text}
        </p>
        <cite className="Quite__author">{quote.author}</cite>
    </blockquote>
);
