var path = require('path')
describe('optimal home page', function() {
    
    beforeEach(function() {
        browser.get('http://localhost:5000/');
        browser.waitForAngular();
    });

    it('should add a video', function(){
        element(by.model('title')).sendKeys('test');
        var fileToUpload = './video-test.mp4';
        var absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.css('input[type="file"]')).sendKeys(absolutePath); 
        element(by.id('submit')).click();

        var videoList = element.all(by.repeater('video in videos'));
        expect(videoList.count()).toEqual(1)

    })

});