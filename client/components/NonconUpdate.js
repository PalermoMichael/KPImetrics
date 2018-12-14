import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchNonconQuery from '../queries/fetchNoncon';
import { Row, Col, Input, Button } from 'react-materialize';

import updateNoncon from '../queries/updateNoncon';
import fetchOpenNonconsQuery from '../queries/fetchOpenNoncons';

class NonconUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nc_status: props.nc_status,
			nc_root_cause: props.nc_root_cause,
			nc_is_repeat: false,
			Man: false,
			Method: false,
			Machine: false,
			Material: false
		};
	}

	toggleChangeMan = () => {
		this.setState(prevState => ({
			Man: !prevState.Man
		}));
	};
	toggleChangeMachine = () => {
		this.setState(prevState => ({
			Machine: !prevState.Machine
		}));
	};
	toggleChangeMaterial = () => {
		this.setState(prevState => ({
			Material: !prevState.Material
		}));
	};
	toggleChangeMethod = () => {
		this.setState(prevState => ({
			Method: !prevState.Method
		}));
	};

	onSubmit = event => {
		event.preventDefault();

		let arr = [];
		for (var key in this.state) {
			if (this.state[key] === true) {
				arr.push(key + ' ');
			}
		}

		this.props
			.mutate({
				variables: {
					nc_status: this.state.nc_status,
					nc_is_closed: this.state.nc_is_closed,
					nc_date_closed: this.state.nc_date_closed,
					nc_is_repeat: this.state.nc_is_repeat,
					nc_root_cause: [...arr],
					nc_root_cause: this.state.nc_root_cause_sub,
					nc_root_cause_sub_break: this.state.nc_root_cause_sub_break,
					id: this.props.params.id
				},
				refetchQueries: [
					{
						query: fetchNonconQuery,
						variables: {
							id: this.props.params.id
						}
					}
				],
				awaitRefetchQueries: true
			})
			.then(() =>
				hashHistory.push(
					`/nonconformances/${this.props.data.nonconformance.id}`
				)
			);
	};

	render() {
		// console.log(this.props);
		const nonconformance = this.props.data.nonconformance;

		if (this.props.data.loading) {
			return <p>...Loading...</p>;
		}

		return (
			<div>
				<div>
					<br />
					{nonconformance.nc_title}
					<br />
					Status: {nonconformance.nc_status}
				</div>
				<br />
				<form onSubmit={this.onSubmit.bind(this)}>
					<Row>
						<Input
							s={4}
							type="select"
							label="Status"
							onChange={event =>
								this.setState({ nc_status: event.target.value })
							}
						>
							<option>Status</option>
							<option value="Closed">Closed</option>
							<option value="Void">Void</option>
						</Input>

						<Input
							s={4}
							type="date"
							label="Date Closed"
							name="Date Closed"
							format="dd mmm yyyy"
							onChange={event =>
								this.setState({ nc_date_closed: event.target.value })
							}
						/>
					</Row>
					<Row>
						<Input
							s={4}
							className="checkbox-sox filled-in"
							name="Repeat"
							type="checkbox"
							label="Is Repeat?: "
							value="true"
							onChange={event =>
								this.setState({ nc_is_repeat: event.target.value })
							}
						/>
					</Row>
					<Row>
						<Input
							type="checkbox"
							checked={this.state.Man}
							value="Man "
							label="Man"
							name="checkbox-multiple"
							className="checkbox-sox filled-in"
							onChange={this.toggleChangeMan}
						/>
						<Input
							type="checkbox"
							checked={this.state.Method}
							value="Method "
							label="Method"
							name="checkbox-multiple"
							className="checkbox-sox filled-in"
							onChange={this.toggleChangeMethod}
						/>
						<Input
							type="checkbox"
							checked={this.state.Machine}
							value="Machine "
							label="Machine"
							name="checkbox-multiple"
							className="checkbox-sox filled-in"
							onChange={this.toggleChangeMachine}
						/>
						<Input
							type="checkbox"
							checked={this.state.Material}
							value="Material "
							label="Material"
							name="checkbox-multiple"
							className="checkbox-sox filled-in"
							onChange={this.toggleChangeMaterial}
						/>
					</Row>
					<Row>
						<Input
							s={4}
							type="select"
							label="Root Cause Subcategory"
							onChange={event =>
								this.setState({ nc_root_cause_sub: event.target.value })
							}
						>
							<option>Subcategory</option>
							<option value="ASEPTIC PROCESSING TECHNIQUES">
								Aseptic Processing Techniques
							</option>
							<option value="CELL COUNT">Cell Count</option>
							<option value="EQUIPMENT">Equipment</option>
							<option value="EXPECTATIONS">Expectations</option>
							<option value="FACILITIES - HUMAN">Facilities - Human</option>
							<option value="HUMAN ERROR">Human Error</option>
							<option value="HUMAN PERFORMANCE">Human Performance</option>
							<option value="IMPROPER/EXCESSIVE HANDLING">
								Improper / Excessive Handling
							</option>
							<option value="KNOWLEDGE-BASED DECISION REQUIRED">
								Knowledge-based Decision Required
							</option>
							<option value="LEADERSHIP & SUPERVISION">
								Leadership & Supervision
							</option>
							<option value="MACHINE">Machine</option>
							<option value="METHOD">Method</option>
							<option value="MFG - HUMAN">Manufacturing - Human</option>
							<option value="MM - HUMAN">Materials Management - Human</option>
							<option value="N/A - VOIDED">N/A - Voided</option>
							<option value="PROCEDURE">Procedure</option>
							<option value="PROCESS">Process</option>
							<option value="PROCESS GAP">Process Gap</option>
							<option value="RAW MATERIAL SPLIT IN TWO">
								Raw Material Split
							</option>
							<option value="TASK PERFORMANCE">Task Performance</option>
							<option value="TBD">TBD</option>
							<option value="UNKNOWN">Unknown</option>
						</Input>
						<Input
							s={4}
							type="select"
							label="Root Cause Subcategory Breakdown"
							onChange={event =>
								this.setState({ nc_root_cause_sub_break: event.target.value })
							}
						>
							<option>Subcategory Breakdown</option>
							<option value="CALCULATIONS">Calculations</option>
							<option value="CLIMET">Climet</option>
							<option value="COMMUNICATION INEFFECTIVE">
								Communication Ineffective
							</option>
							<option value="COMPONENT/PROOF WRONG">
								Component / Proof Wrong
							</option>
							<option value="CONTAMINATION">Contamination</option>
							<option value="CHANGE CONTROL">Change Control</option>
							<option value="DESIGN">Design</option>
							<option value="DOC CONTROL">Document Control</option>
							<option value="DOC ERROR">Document Error</option>
							<option value="ENVIRONMENT-MAN">Environment - Man</option>
							<option value="EQUIPMENT - MALFUNCTION">
								Equipment - Malfunction
							</option>
							<option value="EQUIPMENT - FAILURE">Equipment - Failure</option>
							<option value="EXPECTATIONS">Expectations</option>
							<option value="EXPIRED MATERIAL USED">
								Expired Material Used
							</option>
							<option value="FAILURE TO FOLLOW SOP">
								Failure To Follow SOP
							</option>
							<option value="HANDLING MATERIALS/SAMPLES">
								Handling Materials / Samples
							</option>
							<option value="INATTENTION TO DETAILS">
								Inattention To Details
							</option>
							<option value="INCORRECT # TUBES USED">
								Incorrect # Of Tubes Used
							</option>
							<option value="INCORRECT SAMPLE TAKEN">
								Incorrect Sample Taken
							</option>
							<option value="INEFFECTIVE PLANNING/SCHEDULING">
								Ineffective Planning / Scheduling
							</option>
							<option value="INSTRUMENT FAILURE">Instrument Failure</option>
							<option value="KNOWLEDGE-BASED DECISION REQUIRED">
								Knowledge-based Decision Required
							</option>
							<option value="LEAK">Leak</option>
							<option value="LOOSE LIDS">Loose Lids</option>
							<option value="LOW STARTING CELL CONCENTRATION">
								Low Starting Cell Concentration
							</option>
							<option value="N/A - VOIDED">N/A - Voided</option>
							<option value="NEGATIVE PRESSURE ALARM">
								Negative Pressure Alarm
							</option>
							<option value="NOT USED / PROCESS DESIGN INPUT/OUTPUT">
								Not Used / Process Design I/O
							</option>
							<option value="OVERSEEDED">Overseeded</option>
							<option value="PAPERWORK GAP">Paperwork Gap</option>
							<option value="PART FAILURE">Part Failure</option>
							<option value="PROCEDURE GAP">Procedure Gap</option>
							<option value="PROCESS DESIGN INPUT/OUTPUT">
								Process Design I/O
							</option>
							<option value="PROTOCOL">Protocol</option>
							<option value="SAMPLE ERROR">Sample Error</option>
							<option value="SAMPLE NOT TAKEN">Sample Not Taken</option>
							<option value="SKILLS/KNOWLEDGE">Skills / Knowledge</option>
							<option value="TASK PERFORMANCE">Task Performance</option>
							<option value="TBD">TBD</option>
							<option value="TEST">Test</option>
							<option value="TRANSCRIPTION ERROR">Transcription Error</option>
							<option value="UNDERSEED">Underseed</option>
							<option value="UNKNOWN">Unknown</option>
							<option value="WORKLOAD BALANCE">Workload Balance</option>
						</Input>
					</Row>

					<Button className="btn color blue" type="Submit">
						Submit
					</Button>
				</form>
			</div>
		);
	}
}
export default compose(
	graphql(updateNoncon, {
		options: props => {
			return {
				variables: {
					id: props.params.id
				}
			};
		}
	}),
	graphql(fetchNonconQuery, {
		options: props => {
			return {
				variables: {
					id: props.params.id
				}
			};
		}
	})
)(NonconUpdate);
