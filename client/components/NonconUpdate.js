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
			Man : !prevState.Man
		}));
	};
	toggleChangeMachine = () => {
		this.setState(prevState => ({
			Machine : !prevState.Machine
		}));
	};
	toggleChangeMaterial = () => {
		this.setState(prevState => ({
			Material : !prevState.Material
		}));
	};
	toggleChangeMethod = () => {
		this.setState(prevState => ({
			Method : !prevState.Method
		}));
	};

	onSubmit = event => {
		event.preventDefault();

		let arr = [];
		for (var key in this.state) {
			if (this.state[key] === true) {
				arr.push(key + " ");
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
