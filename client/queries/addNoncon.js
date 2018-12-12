import gql from 'graphql-tag';

const addNoncon = gql`
    mutation addNoncon( 
        $nc_title: String,
        $nc_status: String,
        $nc_owner: String,
        $nc_client: Int,
        $nc_classification: String,
        $nc_owner_department: String,
        $nc_site_location: String,
        $nc_type: String,
        $nc_date_occurred: String,
        $nc_date_event_detected: String,
        $nc_date_writer_assigned: String,
        $nc_root_cause: String,
        $nc_regulatory_impact: String      
        ){
        addNoncon(
        nc_title: $nc_title,
        nc_status: $nc_status,
        nc_owner: $nc_owner,
        nc_client: $nc_client,
        nc_classification: $nc_classification,
        nc_owner_department: $nc_owner_department,
        nc_site_location: $nc_site_location,
        nc_type: $nc_type,
        nc_date_occurred: $nc_date_occurred,
        nc_date_event_detected: $nc_date_event_detected,
        nc_date_writer_assigned: $nc_date_writer_assigned,
        nc_root_cause: $nc_root_cause,
        nc_regulatory_impact: $nc_regulatory_impact
        ){
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
        nc_root_cause
        nc_regulatory_impact
        }
    }`;

export default addNoncon;
