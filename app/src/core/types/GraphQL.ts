export type Edge<T> = {
    cursor?: string,
    node: T
};

export type Connection<T> = {
    totalCount?: number,
    pageInfo?: PageInfo,
    edges: Edge<T>[]
}

export type PageInfo = {
    endCursor?: string,
    hasNextPage?: boolean,
};
