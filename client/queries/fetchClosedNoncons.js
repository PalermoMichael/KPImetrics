import gql from 'graphql-tag';

const fetchClosedNonconsQuery = gql`
    {
        closedNonconformances {
            id
            nc_title
            nc_status
            nc_owner_department
            nc_date_closed
            nc_owner
        }
    }
`;

export default fetchClosedNonconsQuery;