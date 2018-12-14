import gql from 'graphql-tag';

const updateNoncon = gql`
	mutation updateNoncon(
		$nc_status: String
		$id: ID!
		$nc_date_closed: String
		$nc_is_repeat: Boolean
		$nc_root_cause: [String]
		$nc_root_cause_sub: [String]
		$nc_root_cause_sub_break: [String]
	) {
		updateNoncon(
			nc_status: $nc_status
			id: $id
			nc_date_closed: $nc_date_closed
			nc_is_repeat: $nc_is_repeat
			nc_root_cause: $nc_root_cause
			nc_root_cause_sub: $nc_root_cause_sub
			nc_root_cause_sub_break: $nc_root_cause_sub_break
		) {
			id
			nc_status
			nc_date_closed
			nc_is_repeat
            nc_root_cause
            nc_root_cause_sub
			nc_root_cause_sub_break
		}
	}
`;

export default updateNoncon;
