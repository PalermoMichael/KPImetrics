const mongoose = require('mongoose');
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLID,
	GraphQLInt,
	GraphQLString
} = graphql;
const Comment = mongoose.model('comment');

const CommentType = new GraphQLObjectType({
	name: 'CommentType',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		comments: {
			type: GraphQLString
		},
		capa: {
			type: require('./capa_type'),
			resolve(parentValue) {
				return Comment.findById(parentValue)
					.populate('capa')
					.then(comment => {
						return comment.capa;
					});
			}
		}
	})
});

module.exports = CommentType;
