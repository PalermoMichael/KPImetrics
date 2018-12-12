const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DescriptionSchema= new Schema({
    noncon: {
        type: Schema.Types.ObjectId,
        ref: 'noncon'
    },
    text: {
        type: String
    }
});

mongoose.model('description', DescriptionSchema)