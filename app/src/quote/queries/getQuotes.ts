import gql from "graphql-tag";

export default gql`
    query getQuotes {
        quotes(
            first: 25,
            order: { createdAt: "DESC" }
        ) {
            totalCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    slug
                    author
                    title
                    text
                    createdAt
                }
            }
        }
    }
`;
