import gql from "graphql-tag";

export default gql`
    query getQuotes {
        quotes(
            first: 25
        ) {
            totalCount
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    id
                    author
                    title
                    text
                    createdAt
                }
            }
        }
    }
`;
