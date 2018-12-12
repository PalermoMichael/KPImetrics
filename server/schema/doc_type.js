const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;
const Doc = mongoose.model('docs');

const DocType = new GraphQLObjectType({
    name: 'DocType',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        document: {
            type: GraphQLString
        },
        capa: {
            type: require('./capa_type'),
            resolve(parentValue) {
                return Doc.findById(parentValue).populate('capa')
                    .then(doc => {
                        return doc.capa
                    });
            }
        }
    })
});

module.exports = DocType;