var User = require('../models/users');

module.exports = {
    createUsers: function(req, res){
        console.log('in controllers');
        var user = new User(req.body);
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err, user){
            console.log('save')
            if (err) {
                if (err.code === 11000) {
                    res.json({
                        message: 'A user with this name exists'
                    })
                } else {
                    res.json({
                        message: err
                    });
                } 
            }
            else {
                res.json({
                    message: 'User created'
                });
            }
        })
    },

    userLogin: function(req, res){
        User.findOne({
            username: req.body.username
        }).select('username password').exec(function(err, user) {
            if (err) {
                res.json({
                    message: 'Error logging in'
                });
            }
            if (!user) {
                res.json({
                    message: 'User does not exist'
                });
            }
            else if (user) {
                var isPasswordValid = user.comparePassword(req.body.password);
                if (isPasswordValid) {
                    res.json({
                        message: 'welcome back'
                    });
                } else {
                    res.json({
                        message: 'incorrect password'
                    })
                }
            }
            next();
        });
    }
}