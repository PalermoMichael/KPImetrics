const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    capa: {
        type: Schema.Types.ObjectId,
        ref: 'capa'
    },
    comments: {
        type: String
    }
});

mongoose.model('comment', CommentSchema);
