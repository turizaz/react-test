const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
import server from '../server'
const sinon = require('sinon')
chai.use(chaiHttp)
import * as model from '../database/queries/table'
describe('test db', function () {
    afterEach(function () {
        sinon.restore();
    })
    it('get rows from db', function (done) {
        sinon.stub(model, 'getAll').usingPromise(Promise).resolves({rows: ['text1', 'text2']});
        chai.request(server)
            .get('/api')
            .end(function (err, res) {
                assert.equal(res.body.length, 2)
                assert.equal(res.statusCode, 200)
                done()
            })
    })
    it('get rows from db error', function (done) {
        sinon.stub(model, 'getAll').usingPromise(Promise).rejects('db error');
        chai.request(server)
            .get('/api')
            .end(function (err, res) {
                assert.equal(res.text, 'Internal error')
                assert.equal(res.statusCode, 500)
                done()
            })
    })
    it('test save to db bad params', function(done) {
        sinon.stub(model, 'save').usingPromise(Promise).resolves(true);
        chai.request(server)
            .post('/api')
            .send({badParam: 'text'})
            .end(function (err, res) {
                assert.equal(res.statusCode, 422)
                done()
            })
    })
    it('test save to db db error', function(done) {
        sinon.stub(model, 'save').usingPromise(Promise).rejects('db error')
        chai.request(server)
            .post('/api')
            .send({text: 'text'})
            .end(function (err, res) {
                assert.equal(res.statusCode, 500)
                done()
            })
    })
    it('test save to db success', function(done) {
        sinon.stub(model, 'save').usingPromise(Promise).resolves(true);
        chai.request(server)
            .post('/api')
            .send({text: 'text'})
            .end(function (err, res) {
                assert.equal(res.statusCode, 200)
                done()
            })
    });
});
