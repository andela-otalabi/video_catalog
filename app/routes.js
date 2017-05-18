var userController = require('./controllers/users');
var videoController = require('./controllers/video');

module.exports = function(app){
    app.route('/api/users').post(userController.createUsers);
    app.route('/login').post(userController.userLogin);
    app.route('/api/videos').get(videoController.getVideos);
    app.route('/api/videos').post(videoController.uploadVideo, videoController.createVideo);
    app.get('*', function(req, res){
        res.sendfile('./public/index.html');
    })
}