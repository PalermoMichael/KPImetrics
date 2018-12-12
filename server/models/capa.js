const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const riskLevelEnums = ['Major', 'Minor', 'Critical'];
const statusEnums = [
	'Void',
	'Open',
	'Completed',
	'Extended',
	'Overdue'
];
const formattedDate = moment(Schema.occurrencedate).format('YYYY-MM-DD');

const CapaSchema = new Schema(
	{
		title: {
			type: String
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		assignedBy: {
			type: String,
			ref: 'assignedBy'
		},
		capaOwner: {
			type: String
		},
		client: {
			type: Number,
			ref: 'client'
		},
		riskLevel: {
			type: String,
			enum: riskLevelEnums
		},
		department: {
			type: String,
			enum: [
				'QC Micro',
				'Manufacturing',
				'QC Analytical',
				'Materials Management',
				'Validations',
				'Facilities',
				'QC Operations',
				'QA',
				'Doc Control'
			]
		},
		investigationStatus: {
			type: String,
			enum: statusEnums
		},
		capaPlanStatus: {
			type: String,
			enum: statusEnums
		},
		effectivenessStatus: {
			type: String,
			enum: ['Void', 'Completed', 'Pending', 'On-time']
		},
		investigationDueDate: {
			type: String,
			default: formattedDate
		},
		effectivenessDueDate: {
			type: String,
			default: formattedDate
		},
		dateAssigned: {
			type: String,
			default: formattedDate
		},
		capaIsClosed: {
			type: Boolean,
			ref: 'closed'
		},
		docs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'docs'
			}
		],
		description: [
			{
				type: Schema.Types.ObjectId,
				ref: 'description'
			}
		],
		comment: [
			{
				type: Schema.Types.ObjectId,
				ref: 'comment'
			}
		],
		created: {
			type: Date,
			default: moment()
		}
	},
	{ usePushEach: true }
);
// Add the associated documents to the database entry
CapaSchema.statics.addDocs = function(id, document) {
	const Doc = mongoose.model('doc');

	return this.findById(id).then(capa => {
		const doc = new Doc({ document, capa });
		capa.docs.push(doc);
		return Promise.all([doc.save(), capa.save()]).then(([doc, capa]) => capa);
	});
};
// Add the description of the Capa to the database
CapaSchema.statics.addDescription = function(id, text) {
	const Description = mongoose.model('description');

	return this.findById(id).then(capa => {
		const description = new Description({ text, capa });
		capa.description.push(description);
		return Promise.all([description.save(), capa.save()]).then(
			([description, capa]) => capa
		);
	});
};

CapaSchema.statics.findDescription = function(id) {
	return this.findById(id)
		.populate('description')
		.then(capa => capa.description);
};

CapaSchema.statics.findDocs = function(id) {
	return this.findById(id)
		.populate('docs')
		.then(capa => capa.description);
};

mongoose.model('capa', CapaSchema);
