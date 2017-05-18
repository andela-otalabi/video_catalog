app.factory('Video', function($http){
    return {
        getVideos: function(){
            return $http.get('/api/videos');
        }
    }
})