app.factory('Video', function($http){
    return {
        getVideos: function(){
            return $http.get('/api/videos');
        },

        favoriteVideo: function(video){
            return $http.put('/api/video/favorite/' + video._id, video)
        }
    }
})