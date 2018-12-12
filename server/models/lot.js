const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LotSchema = new Schema({
    noncon: {
        type: Schema.Types.ObjectId,
        ref: 'noncon'
    },
    contents: {
        type: String
    }
});


mongoose.model('lot', LotSchema);