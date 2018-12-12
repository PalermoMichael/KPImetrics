import gql from 'graphql-tag';

const updateNoncon = gql`
    mutation updateNoncon($nc_status: String, $id: ID!, $nc_date_closed: String, $nc_is_repeat: Boolean, $nc_root_cause: [String] ) {
        updateNoncon(nc_status: $nc_status, id: $id, nc_date_closed: $nc_date_closed, nc_is_repeat: $nc_is_repeat, nc_root_cause: $nc_root_cause) {
            id
            nc_status
            nc_date_closed
            nc_is_repeat
            nc_root_cause
        }
    }
`;

export default updateNoncon;