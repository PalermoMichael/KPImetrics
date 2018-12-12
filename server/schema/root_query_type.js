const mongoose = require('mongoose');
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLString
} = graphql;
const Noncon = mongoose.model('noncon');
const Lot = mongoose.model('lot');
const Description = mongoose.model('description');
const NonconType = require('./noncon_type');
const LotType = require('./lot_type');
const DescriptionType = require('./description_type');

const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		nonconformances: {
			type: new GraphQLList(NonconType),
			args: {
				nc_status: {
					type: GraphQLString
				},
				nc_owner_department: {
					type: GraphQLString
				},
				nc_is_closed: {
					type: GraphQLBoolean
				}
			},
			resolve() {
				return Noncon.find({});
			}
		},
		nonconformance: {
			type: NonconType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parentValue, { id }) {
				return Noncon.findById(id);
			}
		},
		openNonconformances: {
			type: new GraphQLList(NonconType),
			args: {
				id: {
					type: GraphQLID
				},
				nc_status: {
					type: GraphQLString
				},
				nc_owner_department: {
					type: GraphQLString
				},
			},
			resolve(parentValue, { id, nc_status, nc_owner_department, nc_owner }) {
				return Noncon.find({ nc_status: 'Open' });
			}
		},
		closedNonconformances: {
			type: new GraphQLList(NonconType),
			args: {
				id: {
					type: GraphQLID
				},
				nc_status: {
					type: GraphQLString
				},
				nc_date_closed: {
					type: GraphQLString
				},
				nc_owner_department: {
					type: GraphQLString
				},
				nc_owner: {
					type: GraphQLString
				}
			},
			resolve(
				parentValue,
				{ id, nc_status, nc_date_closed, nc_owner_department, nc_owner }
			) {
				return Noncon.find({ nc_status: 'Closed' });
			}
		}
	})
});

module.exports = RootQueryType;
