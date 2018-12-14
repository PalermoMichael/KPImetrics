const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const formattedDate = moment(Schema.occurrencedate).format('YYYY-MM-DD');
// const ncSiteLocationEnums = require('./enums/ncSiteLocationEnums');
// const ncTypeEnums = require('./enums/ncTypeEnums');
// const ncClassificationEnums = require('./enums/ncClassificationEnums');
// const ncStatusEnums = require('./enums/ncStatusEnums');
// const ncOwnerWriterEnums = require('./enums/ncOwnerWriterEnums');
// const ncOwnerDepartmentEnums = require('./enums/ncOwnerDepartmentEnums');
let ncEventTypeEnums = [
	'Calculation Error',
	'Client Request',
	'Documentation Error',
	'Equipment Failure',
	'Instrument Failure; Dry Shipper Failure',
	'Material Noncompliance',
	'Material Staging',
	'Material Staging Failure',
	'Process Error',
	'QC Testing Failure',
	'Sampling Error',
	'SCAR',
	'Scheduling Error',
	'Supplier Issue',
	'TBD',
	'Training Error',
	'Void'
];

let ncRootCauseSubEnums = [
	'ASEPTIC PROCESSING TECHNIQUES',
	'CELL COUNT',
	'EQUIPMENT',
	'EXPECTATIONS',
	'FACILITIES - HUMAN',
	'HUMAN ERROR',
	'HUMAN PERFORMANCE',
	'IMPROPER/EXCESSIVE HANDLING',
	'KNOWLEDGE-BASED DECISION REQUIRED',
	'LEADERSHIP & SUPERVISION',
	'MACHINE',
	'METHOD',
	'MFG - MAN',
	'MM - HUMAN',
	'N/A - VOIDED',
	'PROCEDURE',
	'PROCESS',
	'PROCESS GAP',
	'RAW MATERIAL SPLIT IN TWO',
	'TASK PERFORMANCE',
	'TBD',
	'UNKNOWN'
];
let ncStatusEnums = ['Voided', 'Open', 'Closed'];
let ncOwnerDepartmentEnums = [
	'QC Micro',
	'Manufacturing',
	'QC Analytical',
	'Materials Management',
	'Validations',
	'QC Tissue Culture',
	'Regulatory Affairs',
	'Facilities',
	'QC Operations',
	'QA',
	'QA Doc Control',
	'Supply Chain'
];
let ncOwnerWriterEnums = [
	'A.Helmreich(112)',
	'A.Williams',
	'A.Powell',
	'C.Free',
	'C.Key',
	'D.Lee',
	'F.Rhodes',
	'J.Maldonado',
	'K.Johnson',
	'K.Grimes',
	'M.Bassett',
	'M.Poore',
	'R.Parker',
	'R.Foster',
	'R.Patel',
	'R.Flowers',
	'S.Pfister',
	'S.Tran',
	'S.Foster',
	'TBD',
	'Multiple - See Comments'
];
let ncClassificationEnums = [
	'Major',
	'Minor',
	'Critical',
	'Developmental(Mock)',
	'TBD'
];
let ncSiteLocationEnums = [
	'N/A',
	'B - Corridor',
	'D - Corridor',
	'Suite B1',
	'Suite B11',
	'Suite B12',
	'Suite B3',
	'Suite B5',
	'Suite B6',
	'Roof Top',
	'Lab',
	'Desk Area',
	'Quarantine Cage',
	'PS4',
	'PS2',
	'PS1',
	'PS3'
];
let ncTypeEnums = ['Unplanned', 'Planned'];

let RegulatoryEnums = [
	'No, for Client & Cognate',
	'Yes, for Client',
	'Yes, for Cognate',
	'Yes, for Client & Cognate'
];
let ncRootCauseSubBreakEnums = [
	'CALCULATIONS',
	'CHANGE CONTROL',
	'CLIMET',
	'COMMUNICATION INEFFECTIVE',
	'COMPONENT/PROOF WRONG.',
	'CONTAMINATION',
	'DESIGN',
	'DOC CONTROL',
	'DOC ERROR',
	'ENVIRONMENT-MAN',
	'EQUIPMENT',
	'EQUIPMENT - MALFUNCTION',
	'EQUIPMENT FAILURE',
	'EXPECTATIONS',
	'EXPIRED MATERIAL USED',
	'FAILURE TO FOLLOW SOP',
	'HANDLING MATERIALS/SAMPLES',
	'INATTENTION TO DETAILS',
	'INCORRECT # TUBES USED',
	'INCORRECT SAMPLE TAKEN',
	'INEFFECTIVE PLANNING/SCHEDULING',
	'INSTRUMENT FAILURE',
	'KNOWLEDGE-BASED DECISION REQUIRED',
	'LEAK',
	'LOOSE LIDS',
	'LOW STARTING CELL CONCENTRATION',
	'N/A - VOIDED',
	'NEGATIVE PRESSURE ALARM',
	'NOT USED / PROCESS DESIGN INPUT/OUTPUT',
	'OVERSEEDED',
	'PAPERWORK GAP',
	'PART FAILURE',
	'PROCEDURE GAP',
	'PROCESS DESIGN INPUT/OUTPUT',
	'PROTOCOL',
	'SAMPLE ERROR',
	'SAMPLE NOT TAKEN',
	'SKILLS/KNOWLEDGE',
	'TASK PERFORMANCE',
	'TBD',
	'TEST',
	'TRANSCRIPTION ERROR',
	'UNDERSEED',
	'UNKNOWN',
	'WORKLOAD BALANCE'
];

const NonconSchema = new Schema(
	{
		nc_title: {
			type: String,
			required: true
		},
		nc_status: {
			type: String,
			enum: ncStatusEnums
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		nc_owner: {
			type: String,
			enum: ncOwnerWriterEnums
		},
		nc_client: {
			type: Number,
			ref: 'client'
		},
		nc_classification: {
			type: String,
			enum: ncClassificationEnums
		},
		nc_owner_department: {
			type: String,
			enum: ncOwnerDepartmentEnums
		},
		nc_site_location: {
			type: String,
			enum: ncSiteLocationEnums
		},
		nc_type: {
			type: String,
			enum: ncTypeEnums
		},
		nc_date_occurred: {
			type: String,
			default: formattedDate
		},
		nc_date_event_detected: {
			type: String,
			default: formattedDate
		},
		nc_triage_date: {
			type: String,
			default: formattedDate
		},
		nc_date_writer_assigned: {
			type: String,
			default: formattedDate
		},
		nc_regulatory_impact: {
			type: String,
			enum: RegulatoryEnums
		},
		nc_is_closed: {
			type: Boolean,
			ref: 'closed'
		},
		nc_date_closed: {
			type: String,
			default: formattedDate
		},
		nc_root_cause: {
			type: [String],
			ref: 'rc'
		},
		nc_root_cause_sub: {
			type: [String],
			enum: ncRootCauseSubEnums
		},
		nc_root_cause_sub_break: {
			type: [String],
			enum: ncRootCauseSubBreakEnums
		},
		nc_event_type: {
			type: [String],
			enum: ncEventTypeEnums
		},
		nc_is_repeat: {
			type: Boolean,
			ref: 'repeat'
		},
		lots: [
			{
				type: Schema.Types.ObjectId,
				ref: 'lot'
			}
		],
		description: [
			{
				type: Schema.Types.ObjectId,
				ref: 'description'
			}
		],
		created: {
			type: Date,
			default: moment()
		}
	},
	{ usePushEach: true }
);

NonconSchema.statics.addLot = function(id, contents) {
	const Lot = mongoose.model('lot');

	return this.findById(id).then(noncon => {
		const lot = new Lot({ contents, noncon });
		noncon.lots.push(lot);
		return Promise.all([lot.save(), noncon.save()]).then(
			([lot, noncon]) => noncon
		);
	});
};

NonconSchema.statics.addDescription = function(id, text) {
	const Description = mongoose.model('description');

	return this.findById(id).then(noncon => {
		const description = new Description({ text, noncon });
		noncon.description.push(description);
		return Promise.all([description.save(), noncon.save()]).then(
			([description, noncon]) => noncon
		);
	});
};

NonconSchema.statics.findDescription = function(id) {
	return this.findById(id)
		.populate('description')
		.then(noncon => noncon.description);
};

NonconSchema.statics.findLots = function(id) {
	return this.findById(id)
		.populate('lots')
		.then(noncon => noncon.lots);
};

mongoose.model('noncon', NonconSchema);
