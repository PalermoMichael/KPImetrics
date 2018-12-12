const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const Description = mongoose.model('description');

const DescriptionType = new GraphQLObjectType({
    name: 'DescriptionType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        },
        capa: {
            type: require('./capa_type'),
            resolve(parentValue) {
                return Description.findById(parentValue).populate('capa')
                .then(description => {
                    return description.capa
                })
            }
        },
        noncon: {
            type: require('./noncon_type'),
            resolve(parentValue) {
                return Description.findById(parentValue).populate('noncon')
                    .then(description => {
                        console.log('description', description);
                        return description.noncon;
                    });
            }
        }
    })
});

module.exports = DescriptionType;
