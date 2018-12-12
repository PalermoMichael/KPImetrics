import gql from 'graphql-tag';

const fetchNonconQuery = gql`
    query fetchNonconQuery($id: ID!) {
        nonconformance(id: $id) {
            id
            nc_title
            nc_status
            nc_owner
            nc_client
            nc_classification
            nc_owner_department
            nc_site_location
            nc_type
            nc_date_occurred
            nc_date_event_detected
            nc_date_writer_assigned
            nc_date_closed
            nc_is_repeat
            nc_root_cause
            lots {
                id
                contents
            }
            description {
                id
                text
            }
        }
    }
`;

export default fetchNonconQuery;
