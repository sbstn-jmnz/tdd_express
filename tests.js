var request = require('supertest');
var app = require('./app');

describe('Requests to root path', function(){

  it('Returns a 200 status code', function(done){
      request(app)
       .get('/')
       .expect(200, done)
   });

   it('Retuns a html format', function(done){
     request(app)
   	.get('/')
   	.expect('Content-type', /html/, done);
   });

   it('Returns an index file with Cities', function(done){
     request(app)
     .get('/')
     .expect(/weeds/i,done);
   });
});

describe('Listin weeds on /weeds', function(){

  it('Returns a 200 status code', function(done){
	request(app)
	.get('/weeds')
	.expect(200, done);
  });

  it('Returns JSON format', function(done){
	request(app)
	.get('/weeds')
	.expect('Content-type', /json/, done);
  });

  it('Returns initial weeds', function(done){
	request(app)
	.get('/weeds')
	.expect(JSON.stringify(["Medical","Jack","Moby Dick"]), done);
  });
});

describe('Creating new weeds', function(){
  it('Returns a new 201 status code', function(done){
    request(app)
     .post('/weeds')
     .send('name=Ganja&description=where+magic+begins')
     .expect(201,done);
  });

  it('Returns the city name', function(done){
    request(app)
    .post('/weeds')
    .send('name=Ganja&description=where+magic+begins')
    .expect(/ganja/i,done);
  })
});
