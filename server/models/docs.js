const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocSchema = new Schema({
	capa: {
		type: Schema.Types.ObjectId,
		ref: 'capa'
	},
	document: {
		type: String
	}
});

mongoose.model('docs', DocSchema);
