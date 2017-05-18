app.controller('VideoCtrl', ['$scope', 'Upload','Video',  function($scope, Upload, Video){

    $scope.displayVideos = false

    Video.getVideos().then(function(res){
        $scope.videos = res.data
        if (res.data.length > 0) {
            $scope.displayVideos = true;
        }
    }, function(err){
        console.log(err);
    })

    $scope.pauseOrPlay = function(ele){
        var video = angular.element(ele.srcElement);
        video[0].pause(); // video.play()
    }

    $scope.createVideo = function(file){
        Upload.upload({
            url: '/api/videos',
            data: {file: file, 'title' : $scope.title}
        }).then(function(res){
            window.location.reload(true);
            console.log(res, 'success');
        }, function(resp){
            console.log('error')
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.progress = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name;
        })
    }
}])
