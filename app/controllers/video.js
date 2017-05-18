var Video = require('../models/videos');
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dksswui9h', 
    api_key: '513962888868735',
    api_secret: 'q0TdLu9bxtloGqwAEId0eilUwsk'
});

module.exports = {
    createVideo: function(req, res){
        var video = Video(req.body);
        video.title = req.body.title;
        video.url = req.url;
        video.save(function(err, video){
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'your video has been saved',
                video
            })
        })
    },

    uploadVideo: function(req, res, next){
        if (req.files) {
            cloudinary.uploader.upload(req.files[0].path, 
                function(result) {
                    if(result.url){
                        req.url = result.url;
                        next()
                    }
                    else{
                        res.json({
                            error: 'you need to check the file properly'
                        })
                    }
                }, 
                { resource_type: "video", 
                  eager: [
                  { width: 300, height: 300,
                    crop: "pad", audio_codec: "none" }, 
                  { width: 160, height: 100,
                    crop: "crop", gravity: "south",
                    audio_codec: "none" } ]});
        } else {
            next()
        }
    },

    getVideos: function(req, res){
        Video.find(function(err, videos){
            if (err) {
                res.send(err);
            }
            res.json(videos);
        })
    }
}
