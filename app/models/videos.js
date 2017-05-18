var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    url: {
        type: String
    },

    createdAt: {
        type: Date
    }
});


module.exports = mongoose.model('Video', VideoSchema);