const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const Lot = mongoose.model('lot');

const LotType = new GraphQLObjectType({
    name: 'LotType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        contents: {
            type: GraphQLString
        },
        noncon: {
            type: require('./noncon_type'),
            resolve(parentValue) {
                return Lot.findById(parentValue).populate('deviation')
                    .then(lot => {
                        return lot.deviation
                    });
             }
        }
    })
});

module.exports = LotType;
