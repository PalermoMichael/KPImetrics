const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    
    
} = graphql;

const LotType = require('./lot_type');
const DescriptionType= require('./description_type');
const Noncon = mongoose.model('noncon');

const NonconType = new GraphQLObjectType({
    name: 'NonconType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        nc_title: {
            type: GraphQLString
        },
        nc_status: {
            type: GraphQLString
        },
        nc_client: {
            type: GraphQLInt
        },
        nc_owner: {
            type: GraphQLString
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
        nc_regulatory_impact: {
            type: GraphQLString
        },
        nc_date_occurred: {
            type: GraphQLString
        },
        nc_date_event_detected: {
            type: GraphQLString
        },
        nc_triage_date: {
            type: GraphQLString
        },
        nc_date_writer_assigned: {
            type: GraphQLString
        },
        nc_root_cause: {
            type: new GraphQLList(GraphQLString)
        },
        nc_is_repeat: {
            type: GraphQLBoolean
        },
        nc_date_closed: {
            type: GraphQLString
        },
        lots: {
            type: new GraphQLList(LotType),
            resolve(parentValue) {
                return Noncon.findLots(parentValue.id);
            }
        },
        description: {
            type: new GraphQLList(DescriptionType),
            resolve(parentValue) {
                return Noncon.findDescription(parentValue.id);
            }
        }
    })
});

module.exports = NonconType;
