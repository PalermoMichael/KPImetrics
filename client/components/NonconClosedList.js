import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchClosedNonconsQuery from '../queries/fetchClosedNoncons';
import {
	Row,
	Col,
	Collection,
	Preloader,
	CollectionItem,
	CollapsibleItem,
	Collapsible,
	Icon
} from 'react-materialize';
import NonconDashboard from './NonconDashboard';

class NonconClosedList extends Component {
	constructor(props) {
		super(props);
	}

	renderClosedNonconformances() {
		return this.props.data.closedNonconformances.map(
			({
				id,
				nc_title,
				nc_status,
				nc_date_closed,
				nc_owner_department,
				nc_owner
			}) => {
				return (
					<CollapsibleItem header={nc_title} key={id}>
						<p>Dept: {nc_owner_department}</p>

						<p>Closure Date: {nc_date_closed}</p>
						<p>NC Owner: {nc_owner}</p>

						<Link to={`/nonconformances/${id}`}>More Details</Link>
					</CollapsibleItem>
				);
			}
		);
	}

	render() {
		if (this.props.data.loading) {
			return (
				<Row>
					<Col s={12}>
						<Preloader flashing />
					</Col>
				</Row>
			);
		}
		return (
			<div>
				<NonconDashboard />

				<h3>Closed Nonconformances</h3>
		{/*<Link to={`/nonconformances/open`} className="green-text">
					OPEN
		</Link> */}
				<Collapsible>{this.renderClosedNonconformances()}</Collapsible>
			</div>
		);
	}
}

export default graphql(fetchClosedNonconsQuery)(NonconClosedList);
