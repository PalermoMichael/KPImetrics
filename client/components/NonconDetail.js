import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchNonconQuery from '../queries/fetchNoncon';
import LotCreate from './LotCreate';
import moment from 'moment';
import Icon from 'react-materialize/lib/Icon';

class NonconDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { nonconformance } = this.props.data;
		console.warn(nonconformance);

		if (!nonconformance) {
			return (
				<div className="progress">
					<div className="indeterminate" />

					<ul className="collection">...Loading Nonconformances</ul>
				</div>
			);
		}

		return (
			<div>
				<h3 className="left">
					<Link to={`nonconformances/${nonconformance.id}/update`}>
						<Icon>edit</Icon>Edit {nonconformance.nc_title}
					</Link>
				</h3>
				<div className="row">
					<div className="col s24 m12">
						<div className="card large color orange lighten-5">
							<br />
							<p>Status: {nonconformance.nc_status}</p>
							<hr />
							<br />
							<p>Classification: {nonconformance.nc_classification}</p>
							<hr />
							<br />
							<p>Date Assigned: {nonconformance.nc_date_writer_assigned}</p>
							<hr />
							<br />
							<p>NC Owner: {nonconformance.nc_owner}</p>
							<br />
							<hr />
							<p>Root Cause(s): {nonconformance.nc_root_cause}</p>
							<hr />
							<p className="bold-text">
								PRODUCTION NOTE: ALL OTHER DETAILS, DATES, ETC. WILL BE DISPLAYED ON THIS PAGE
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default graphql(fetchNonconQuery, {
	options: props => {
		return {
			variables: {
				id: props.params.id
			}
		};
	}
})(NonconDetail);
