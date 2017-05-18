var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    url: {
        type: String
    }
});


module.exports = mongoose.model('Video', VideoSchema);