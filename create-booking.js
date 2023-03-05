const request = require("supertest")("https://restful-booker.herokuapp.com")
const expect = require("chai").expect

describe("create booking", function () {
    it("success create booking", async function(){
        const response = await request
        .post('/booking')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
            firstname: 'Jim',
            lastname: 'Brown',
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: '2018-01-01',
                checkout: '2019-01-01'
            },
            additionalneeds: 'Breakfast',
        })
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('bookingid');  //assertion
        expect(response.body).to.have.property('booking');
        expect(response.body.booking).to.have.property('firstname');
        expect(response.body.booking).to.have.property('lastname');
        expect(response.body.booking).to.have.property('totalprice');
        expect(response.body.booking).to.have.property('depositpaid');
        expect(response.body.booking).to.have.property('bookingdates');
    })
})