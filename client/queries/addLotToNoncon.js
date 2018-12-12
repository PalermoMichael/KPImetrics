import gql from 'graphql-tag';

const addLotToNoncon = gql`
    mutation addLotToNoncon($contents: String, $deviationId: ID) {
        addLotToNoncon(contents: $contents, deviationId: $deviationId) {
            id
            lots {
                id
                contents
            }
        }
    }
`;

export default addLotToNoncon;
