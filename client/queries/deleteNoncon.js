import gql from 'graphql-tag';

const deleteNoncon = gql`
    mutation DeleteNoncon($id: ID) {
        deleteNoncon(id: $id) {
            id
        }
    }
`;

export default deleteNoncon;