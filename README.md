# Video Catalog App
===================

### Installing dependencies
Run

```
1. npm install
2. bower install
```

### This app requires a .env file
```
1. Create a .env file
2. Sign up on cloudinary.com, copy the cloudinary url
3. Use format CLOUDINARY_URL=#{cloudinary url}
```

### Start app
Run
node index.js
go to http://localhost:5000

### Running tests

Run

```
1. API Tests: mocha tests/api-test.js

### Running integration tests
```
1. Create file video-test.mp4 in tests directory
2. npm install -g protractor
3. webdriver-manager start
4. protractor conf.js
