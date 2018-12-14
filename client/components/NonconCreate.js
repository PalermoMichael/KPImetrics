import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import fetchOpenNonconsQuery from '../queries/fetchOpenNoncons';
import addNoncon from '../queries/addNoncon';
import { Button, Row, Input } from 'react-materialize';
import NonconDashboard from './NonconDashboard';

class NonconCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nc_title: 'NC-',
			nc_status: '',
			nc_owner: '',
			nc_client: '',
			nc_classification: '',
			nc_owner_department: '',
			nc_site_location: '',
			nc_type: '',
			nc_date_occurred: '',
			nc_date_event_detected: '',
			nc_date_writer_assigned: '',
			nc_root_cause: '',
			nc_regulatory_impact: ''
		};
	}

	onSubmit(event) {
		event.preventDefault();
		this.props
			.mutate({
				variables: {
					nc_title: this.state.nc_title,
					nc_status: this.state.nc_status,
					nc_owner: this.state.nc_owner,
					nc_client: this.state.nc_client,
					nc_classification: this.state.nc_classification,
					nc_owner_department: this.state.nc_owner_department,
					nc_site_location: this.state.nc_site_location,
					nc_type: this.state.nc_type,
					nc_date_occurred: this.state.nc_date_occurred,
					nc_date_event_detected: this.state.nc_date_event_detected,
					nc_date_writer_assigned: this.state.nc_date_writer_assigned,
					nc_root_cause: this.state.nc_root_cause,
					nc_regulatory_impact: this.state.nc_regulatory_impact
				},
				refetchQueries: [{ query: fetchOpenNonconsQuery }]
			})
			.then(() => hashHistory.push('/nonconformances'));
	}

	render() {
		return (
			<div>
				<NonconDashboard />
				<h3 className="center">Create New Nonconformance</h3>
				<form className="form" onSubmit={this.onSubmit.bind(this)}>
					<Row>
						<Input
							s={6}
							label="Nonconformance Number:"
							defaultValue="NC-"
							onChange={event =>
								this.setState({ nc_title: event.target.value })
							}
							required
						/>
						<Input
							s={6}
							label="Client:"
							onChange={event =>
								this.setState({ nc_client: event.target.value })
							}
							required
						/>
					</Row>
					<Row>
						<Input
							s={6}
							type="select"
							label="Classification:"
							onChange={event =>
								this.setState({ nc_classification: event.target.value })
							}
						>
							<option>Classification</option>
							<option value="Major">Major</option>
							<option value="Minor">Minor</option>
							<option value="Critical">Critical</option>
							<option value="Developmental (Mock)">Developmental (Mock)</option>
							<option value="TBD">TBD</option>
						</Input>
						<Input
							s={6}
							type="select"
							label="NC Writer:"
							onChange={event =>
								this.setState({ nc_owner: event.target.value })
							}
						>
							<option>Owner / Writer</option>
							<option value="A.Helmreich(112)">A.Helmreich(112)</option>
							<option value="A.Williams">A.Williams</option>
							<option value="A.Powell">A.Powell</option>
							<option value="C.Free">C.Free</option>
							<option value="C.Key">C.Key</option>
							<option value="D.Lee">D.Lee</option>
							<option value="F.Rhodes">F.Rhodes</option>
							<option value="J.Maldonado">J.Maldonado</option>
							<option value="K.Johnson">K.Johnson</option>
							<option value="K.Grimes">K.Grimes</option>
							<option value="M.Bassett">M.Bassett</option>
							<option value="M.Poore">M.Poore</option>
							<option value="R.Parker">R.Parker</option>
							<option value="R.Foster">R.Foster</option>
							<option value="R.Patel">R.Patel</option>
							<option value="R.Flowers">R.Flowers</option>
							<option value="S.Pfister">S.Pfister</option>
							<option value="S.Tran">S.Tran</option>
							<option value="S.Foster">S.Foster</option>
							<option value="TBD">TBD</option>
							<option value="Multiple - See Comments">
								Multiple - See Comments
							</option>
						</Input>
						<Input
							s={6}
							type="select"
							label="Owner Department:"
							onChange={event =>
								this.setState({ nc_owner_department: event.target.value })
							}
						>
							<option>Department</option>
							<option value="QC Micro">QC Micro</option>
							<option value="QC Tissue Culture">QC Tissue Culture</option>
							<option value="QC Analytical">QC Analytical</option>
							<option value="QC Operations">QC Operations</option>
							<option value="Manufacturing">Manufacturing</option>
							<option value="QA">QA</option>
							<option value="QA Doc Control">QA Doc Control</option>
							<option value="Materials Management">Materials Management</option>
							<option value="Facilities">Facilities</option>
							<option value="Supply Chain">Supply Chain</option>
						</Input>
						<Input
							s={6}
							label="Status:"
							type="select"
							onChange={event =>
								this.setState({ nc_status: event.target.value })
							}
						>
							<option>Status</option>
							<option value="Open">Open</option>
							<option value="Closed" disabled>
								Closed
							</option>
							<option value="Void" disabled>
								Void
							</option>
						</Input>
					</Row>
					<Row>
						<Input
							s={6}
							type="select"
							label="Nonconformance Type:"
							onChange={event => this.setState({ nc_type: event.target.value })}
						>
							<option>Type</option>
							<option value="Unplanned">Unplanned</option>
							<option value="Planned">Planned</option>
						</Input>
						<Input
							s={6}
							type="select"
							label="Regulatory Impact:"
							onChange={event =>
								this.setState({ nc_regulatory_impact: event.target.value })
							}
						>
							<option>Regulatory Impact</option>
							<option value="No for Client & Cognate">
								No for Client & Cognate
							</option>
							<option value="Yes, for Client & Cognate">
								Yes for Client & Cognate
							</option>
							<option value="Yes, for Client">Yes for Client</option>
							<option value="Yes, for Cognate">Yes for Cognate</option>
						</Input>
						<Input
							s={6}
							type="select"
							label="Site Location:"
							onChange={event =>
								this.setState({ nc_site_location: event.target.value })
							}
						>
							<option>Site Location</option>
							<option value="N/A">Not Applicable</option>
							<option value="B - Corridor">B - Corridor</option>
							<option value="D - Corridor">D - Corridor</option>
							<option value="Suite B1">Suite B1</option>
							<option value="Suite B11">Suite B11</option>
							<option value="Suite B12">Suite B12</option>
							<option value="Suite B3">Suite B3</option>
							<option value="Suite B5">Suite B5</option>
							<option value="Suite B6">Suite B6</option>
							<option value="Lab">Lab</option>
							<option value="Roof Top">Roof Top</option>
							<option value="Desk Area">Desk Area</option>
							<option value="Quarantine Cage">Quarantine Cage</option>
							<option value="PS1">PS1</option>
							<option value="PS2">PS2</option>
							<option value="PS3">PS3</option>
							<option value="PS4">PS4</option>
						</Input>
					</Row>
					<Row>
						<h2 className="center">Nonconformance Dates</h2>
						<Input
							m={4}
							label="Occurence Date"
							name="Occurence Date"
							type="date"
							format="dd mmm yyyy"
							onChange={event =>
								this.setState({ nc_date_occurred: event.target.value })
							}
						/>
						<Input
							m={4}
							label="Discovery Date"
							name="Discovery Date"
							type="date"
							format="dd mmm yyyy"
							onChange={event =>
								this.setState({ nc_date_event_detected: event.target.value })
							}
						/>
						<Input
							m={4}
							label="Date Assigned"
							name="Date Assigned"
							type="date"
							format="dd mmm yyyy"
							onChange={event =>
								this.setState({ nc_date_writer_assigned: event.target.value })
							}
						/>
					</Row>

					<div className="button-submit col s12">
						<button
							className="btn-large green lighten-2 waves-effect waves-blue z-depth-5"
							type="submit"
						>
							Submit
							<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default graphql(addNoncon)(NonconCreate);
