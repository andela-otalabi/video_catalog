var chai = require('chai');
var chaiHttp = require('chai-http');
var userController = require('../app/controllers/users');
var UserModel = require('../app/models/users');
var server = require('../index.js');
var should = require('should');

chai.use(chaiHttp);

describe('user controller', function(){
    it('should be defined', function(){
        should.exist(userController.createUsers);
    })
})

describe('User Login', function(){
     beforeEach(function(done) {
        UserModel.remove({}, function(err) {
            done();
        });
    });

    it('should login a correct user', function(done){
        var newUser = new UserModel({username: 'ezekiel', password: 'testing dup'});
        newUser.save(function(err){
            if (err) {
                console.log(err);
            }
        });
        var user = {
            username: 'ezekiel',
            password: 'testing dup'
        };
        chai.request(server).post('/login').send(user).end(function(err, res){
            res.statusCode.should.be.eql(200);
            done();
        });
    });
    it('should not login with incorrect credentials', function(done){
        var newUser = new UserModel({username: 'ezekiel', password: 'testing dup'});
        newUser.save(function(err){
            if(err){
                console.log(err);
            }
        });
        var user = {
            username: 'ezekiel',
            password: 'testing'
        };
        chai.request(server).post('/login').send(user).end(function(err, res){
            res.statusCode.should.be.eql(200);
            res.body.should.have.property('message');
            res.body.message.should.be.eql('incorrect password');
            done();
        });
    })
})

describe('User endpoints', function(){

    describe('User POST /api/users', function(){
        it('should create a user', function(done){
            var user = {
                username: 'seyi',
                password: 'd3assessment'
            };
            chai.request(server).post('/api/users').send(user).end(function(err, res){
                res.statusCode.should.be.eql(200);
                done();
            });
        });

        it('should not create a user without username', function(done){
            var user = {
                password: 'd3assessment'
            };
            chai.request(server).post('/api/users').send(user).end(function(err, res){
                res.statusCode.should.be.eql(200);
                res.body.message.should.have.property('errors');
                done();
            });
        });

        it('should not create a user with the same name', function(done){
            var newUser = new UserModel({username: 'ezekiel', password: 'testing dup'});
            newUser.save(function(err){
                if(err){
                    console.log(err);
                }
            });
            var user = {
                username: 'ezekiel',
                password: 'd3assessment'
            };
            chai.request(server).post('/api/users').send(user).end(function(err, res){
                res.statusCode.should.be.eql(200);
                res.body.should.have.property('message');
                res.body.message.should.be.eql('A user with this name exists')
                done();
            });
        })
    })
})