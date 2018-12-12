import gql from 'graphql-tag';

const fetchOpenNonconsQuery = gql`
	{
		openNonconformances {
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

export default fetchOpenNonconsQuery;
