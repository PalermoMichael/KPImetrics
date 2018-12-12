import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchOpenNonconsQuery from '../queries/fetchOpenNoncons';
import deleteNoncon from '../queries/deleteNoncon';

import {
	Row,
	Col,
	Collection,
	Preloader,
	CollapsibleItem,
	Collapsible,
	Icon
} from 'react-materialize';
import NonconDashboard from './NonconDashboard';

class NonconList extends Component {
	onDeleteNoncon(id) {
		this.props
			.mutate({
				// key:id value:id
				variables: { id }
			})
			.then(() => this.props.data.refetch());
	}

	renderNonconformances() {
		return this.props.data.openNonconformances.map(
			({ id, nc_title, nc_owner_department, nc_owner }) => {
				return (
					<CollapsibleItem header={nc_title} key={id}>
						<br />
						<p>Dept: {nc_owner_department}</p>

						<p>Owner: {nc_owner}</p>
						<br />
						<Link to={`/nonconformances/${id}`}>More Details</Link>
						<br />
						<Icon onClick={() => this.onDeleteNoncon(id)}>delete</Icon>
					</CollapsibleItem>
				);
			}
		);
	}

	render() {
		if (this.props.data.loading) {
			return (
				<Row>
					<Col s={4}>
						<Preloader flashing />
						...Loading Nonconformances
					</Col>
				</Row>
			);
		}
		return (
			<div>
				<NonconDashboard />
				<h3>Open Nonconformances</h3>
				
				{/*}<Link to={`/nonconformances/closed`} className="red-text">
					CLOSED
				</Link>
				*/}
				<Collapsible>{this.renderNonconformances()}</Collapsible>
				<Link
					to="/nonconformances/create"
					className="btn-floating btn-large waves-effect waves-light green right"
				>
					<Icon>add</Icon>
				</Link>
			</div>
		);
	}
}

export default graphql(deleteNoncon)(
	graphql(fetchOpenNonconsQuery)(NonconList)
);
