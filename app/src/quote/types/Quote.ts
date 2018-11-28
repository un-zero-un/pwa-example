import {Connection, Edge} from "../../core/types/GraphQL";

export type Quote = {
    id: string,
    title: string,
    slug: string,
    author: string,
    text: string,
    createdAt: string
};

export type QuoteEdge = Edge<Quote>;
export type QuoteConnection = Connection<Quote>;
