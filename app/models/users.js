var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) {
        next();
    }
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) {
            next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password){
    var user = this;
    var generatedPassword = bcrypt.compareSync(password, user.password);
    return generatedPassword;
};

module.exports = mongoose.model('VideoUsers', UserSchema);;