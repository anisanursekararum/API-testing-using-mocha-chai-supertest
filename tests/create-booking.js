const request = require("supertest");//global variable for supertest
const expect = require("chai").expect;//global variable for chai
const booking = require('../data-test/booking.json');//import data used
const authtoken = require('../data-test/auth.json');//import data used
const updatedbooking = require('../data-test/booking-update.json');//import data used

describe('Bootcamp QA automation TestAplikasiKamu', () => {
    const baseurl = 'https://restful-booker.herokuapp.com'; //declare base url API
    var bookingId; //stored bookingID value created and use for get API
    var token; //stored token value created and use for update API

    //post for create token
    before(function(done){
        request(baseurl)
        .post('/auth')//enfpoint of URL API
        .send(authtoken)//send file booking in json that's been imported
        .set('Content-Type', 'application/json') //headers
        .end(function(err, response){
            expect(response.statusCode).to.be.eql(200);
            expect(response.body.token).not.to.be.null;
            //store value token to reuse in another test    
            token = response.body.token;
            if (err) {
                throw err;
            }
            done();
        });
    });

    //post request and successfully create a booking
    it('create a booking', (done) => {
        request(baseurl)
            .post('/booking') //enfpoint of URL API
            .send(booking) //send file booking in json that's been imported
            .set('Accept', 'application/json') //headers
            .set('Content-Type', 'application/json') //headers
            .end(function(err, response) {
                //assertion
                expect(response.statusCode).to.be.eql(200); //check status code
                //assertion property check
                expect(response.body).to.have.property('bookingid');  
                expect(response.body).to.have.property('booking');
                expect(response.body.booking).to.have.property('firstname');
                expect(response.body.booking).to.have.property('lastname');
                expect(response.body.booking).to.have.property('totalprice');
                expect(response.body.booking).to.have.property('depositpaid');
                expect(response.body.booking).to.have.property('bookingdates');
                expect(response.body.booking.bookingdates).to.have.property('checkin');
                expect(response.body.booking.bookingdates).to.have.property('checkout');
                expect(response.body.booking).to.have.property('additionalneeds');
                //assertion makesure id not null
                expect(response.body.bookingid).not.to.be.null;
                //assertion correction value
                expect(response.body.booking.firstname).to.be.eql(booking.firstname);
                expect(response.body.booking.lastname).to.be.eql(booking.lastname);
                expect(response.body.booking.totalprice).to.be.eql(booking.totalprice);
                expect(response.body.booking.depositpaid).to.be.eql(booking.depositpaid);
                expect(response.body.booking.bookingdates).to.be.eql(booking.bookingdates);
                expect(response.body.booking.bookingdates.checkin).to.be.eql(booking.bookingdates.checkin);
                expect(response.body.booking.bookingdates.checkout).to.be.eql(booking.bookingdates.checkout);
                expect(response.body.booking.additionalneeds).to.be.eql(booking.additionalneeds);
                //store value bookingId to reuse in another test    
                bookingId = response.body.bookingid;
                if (err) {
                    throw err;
                }
                done();
            });
    });
    //get request and successfully get a booking by ID
    it('get a booking by ID', (done) => {
        request(baseurl)
        .get('/booking/'+ bookingId)//enfpoint of URL API
        .set('Accept', 'application/json') //headers
        .end(function(err, response){
            //assertion
            expect(response.statusCode).to.be.eql(200);//check status code
            //assertion property check
            expect(response.body).to.have.property('firstname');
            expect(response.body).to.have.property('lastname');
            expect(response.body).to.have.property('totalprice');
            expect(response.body).to.have.property('depositpaid');
            expect(response.body).to.have.property('bookingdates');
            expect(response.body.bookingdates).to.have.property('checkin');
            expect(response.body.bookingdates).to.have.property('checkout');
            expect(response.body).to.have.property('additionalneeds');
            //assertion correction value
            expect(response.body.firstname).to.be.eql(booking.firstname);
            expect(response.body.lastname).to.be.eql(booking.lastname);
            expect(response.body.totalprice).to.be.eql(booking.totalprice);
            expect(response.body.depositpaid).to.be.eql(booking.depositpaid);
            expect(response.body.bookingdates).to.be.eql(booking.bookingdates);
            expect(response.body.bookingdates.checkin).to.be.eql(booking.bookingdates.checkin);
            expect(response.body.bookingdates.checkout).to.be.eql(booking.bookingdates.checkout);
            expect(response.body.additionalneeds).to.be.eql(booking.additionalneeds);
            if (err) {
                throw err;
            }
            done();
        });
    });
    //update request with PUT and successfully updated a booking by ID
    it('update a booking by ID using put', (done) => {
        request(baseurl)
        .put('/booking/'+bookingId)//enfpoint of URL API
        .send(updatedbooking) //send file booking in json that's been imported
        .set('Accept', 'application/json') //headers
        .set('Content-Type', 'application/json') //headers
        .set('Cookie', 'token='+token)//headers token
        .end(function(err, response){
            expect(response.statusCode).to.be.eql(200)//check status code
            //assertion property check
            expect(response.body).to.have.property('firstname');
            expect(response.body).to.have.property('lastname');
            expect(response.body).to.have.property('totalprice');
            expect(response.body).to.have.property('depositpaid');
            expect(response.body).to.have.property('bookingdates');
            expect(response.body.bookingdates).to.have.property('checkin');
            expect(response.body.bookingdates).to.have.property('checkout');
            expect(response.body).to.have.property('additionalneeds');
            //assertion correction value
            expect(response.body.firstname).to.be.eql(updatedbooking.firstname);
            expect(response.body.lastname).to.be.eql(updatedbooking.lastname);
            expect(response.body.totalprice).to.be.eql(updatedbooking.totalprice);
            expect(response.body.depositpaid).to.be.eql(updatedbooking.depositpaid);
            expect(response.body.bookingdates).to.be.eql(updatedbooking.bookingdates);
            expect(response.body.bookingdates.checkin).to.be.eql(updatedbooking.bookingdates.checkin);
            expect(response.body.bookingdates.checkout).to.be.eql(updatedbooking.bookingdates.checkout);
            expect(response.body.additionalneeds).to.be.eql(updatedbooking.additionalneeds);
            if (err) {
                throw err;
            }
            done();
        });
    });
    //update request with PATCH and successfully updated a booking by ID 
    it('update a booking by ID using patch', (done) => {
        var firstname = "Ryujin";//created variable firstname for updating data firstname
        var lastname = "Shin";//created variable lastname for updating data lastname
        request(baseurl)
        .patch('/booking/'+bookingId)//enfpoint of URL API
        .send({
            //the data want to update is only the firstname and lastname, so only the data sent is both
            firstname: firstname,
            lastname: lastname
        })
        .set('Accept', 'application/json') //headers
        .set('Content-Type', 'application/json') //headers
        .set('Cookie', 'token='+token)//headers token
        .end(function(err, response) {
            expect(response.statusCode).to.be.eql(200);//check status code
            //assertion property check
            expect(response.body).to.have.property('firstname');
            expect(response.body).to.have.property('lastname');
            expect(response.body).to.have.property('totalprice');
            expect(response.body).to.have.property('depositpaid');
            expect(response.body).to.have.property('bookingdates');
            expect(response.body.bookingdates).to.have.property('checkin');
            expect(response.body.bookingdates).to.have.property('checkout');
            expect(response.body).to.have.property('additionalneeds');
            //assertion correction value
            expect(response.body.firstname).to.be.eql(firstname); //value checking, the value must be the same as the contents of the variable
            expect(response.body.lastname).to.be.eql(lastname);//value checking, the value must be the same as the contents of the variable
            expect(response.body.totalprice).to.be.eql(updatedbooking.totalprice);
            expect(response.body.depositpaid).to.be.eql(updatedbooking.depositpaid);
            expect(response.body.bookingdates).to.be.eql(updatedbooking.bookingdates);
            expect(response.body.bookingdates.checkin).to.be.eql(updatedbooking.bookingdates.checkin);
            expect(response.body.bookingdates.checkout).to.be.eql(updatedbooking.bookingdates.checkout);
            expect(response.body.additionalneeds).to.be.eql(updatedbooking.additionalneeds);
            if (err) {
                throw err;
            }
            done();
        });
    });
    //successfully deleted a booking by ID 
    it('deleted a booking by ID', (done) => {
        request(baseurl)
        .delete('/booking/'+bookingId)
        .set('Content-Type', 'application/json') //headers
        .set('Cookie', 'token='+token)//headers token
        .end(function(err, response){
            expect(response.statusCode).to.be.eql(201);//check status code
            if (err) {
                throw err;
            }
            done();
        });
    });
})