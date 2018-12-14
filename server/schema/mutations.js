const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLList
} = graphql;
const mongoose = require('mongoose');
const Noncon = mongoose.model('noncon');
const Lot = mongoose.model('lot');
const NonconType = require('./noncon_type');
const LotType = require('./lot_type');
// const UserType = require('./user_type');
const CapaType = require('./capa_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addNoncon: {
			type: NonconType,
			args: {
				nc_title: {
					type: GraphQLString
				},
				nc_status: {
					type: GraphQLString
				},
				nc_owner: {
					type: GraphQLString
				},
				nc_client: {
					type: GraphQLInt
				},
				nc_classification: {
					type: GraphQLString
				},
				nc_owner_department: {
					type: GraphQLString
				},
				nc_site_location: {
					type: GraphQLString
				},
				nc_type: {
					type: GraphQLString
				},
				nc_date_occurred: {
					type: GraphQLString
				},
				nc_date_event_detected: {
					type: GraphQLString
				},
				nc_date_writer_assigned: {
					type: GraphQLString
				},
				nc_root_cause: {
					type: GraphQLString
				},
				nc_regulatory_impact: {
					type: GraphQLString
				}
			},
			resolve(
				parentValue,
				{
					nc_title,
					nc_status,
					nc_owner,
					nc_client,
					nc_classification,
					nc_owner_department,
					nc_site_location,
					nc_type,
					nc_date_occurred,
					nc_date_event_detected,
					nc_date_writer_assigned,
					nc_regulatory_impact
				}
			) {
				return new Noncon({
					nc_title,
					nc_status,
					nc_owner,
					nc_client,
					nc_classification,
					nc_owner_department,
					nc_site_location,
					nc_type,
					nc_date_occurred,
					nc_date_event_detected,
					nc_date_writer_assigned,
					nc_regulatory_impact
				}).save();
			}
		},
		updateNoncon: {
			type: NonconType,
			args: {
				id: { type: GraphQLID },
				nc_status: { type: GraphQLString },
				nc_date_closed: { type: GraphQLString },
				nc_is_repeat: { type: GraphQLBoolean },
				nc_root_cause: { type: new GraphQLList(GraphQLString) },
				nc_root_cause_sub: { type: new GraphQLList(GraphQLString) },
				nc_root_cause_sub_break: { type: new GraphQLList(GraphQLString) }
			},
			resolve(
				parentValue,
				{
					id,
					nc_status,
					nc_date_closed,
					nc_is_repeat,
					nc_root_cause,
					nc_root_cause_sub,
					nc_root_cause_sub_break
				}
			) {
				return new Promise((resolve, reject) => {
					Noncon.findOneAndUpdate(
						{ _id: id },
						{
							$set: {
								nc_status: nc_status,
								nc_date_closed: nc_date_closed,
								id: id,
								nc_is_repeat: nc_is_repeat,
								nc_root_cause: nc_root_cause,
								nc_root_cause_sub: nc_root_cause_sub,
								nc_root_cause_sub_break: nc_root_cause_sub_break
							}
						},
						{ new: true }
					).exec((err, res) => {
						console.log('test', res);
						if (err) reject(err);
						else resolve(res);
					});
				});
			}
		},
		deleteNoncon: {
			type: NonconType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parentValue, { id }) {
				return Noncon.remove({
					_id: id
				});
			}
		}
	}
});

module.exports = mutation;
