import gql from "graphql-tag";

export default gql`
    query getQuoteBySlug($slug: String) {
        quotes(slug: $slug) {
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
