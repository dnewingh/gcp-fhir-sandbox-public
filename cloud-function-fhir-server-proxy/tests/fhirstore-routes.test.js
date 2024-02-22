const request = require('supertest');
const testPatientPayload = require('./sample-patient.json');

const TEST_ENDPOINT = 'http://localhost:8080';

describe('Test Handlers', function () {
    let currentResourceId;

    test('responds to /', () => {
        const result = 'hello world!';       
        expect(result).toEqual('hello world!');
    });

    test('responds to / x2', async () => {
        const res = await request(TEST_ENDPOINT).get('/');
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        //expect(res.text).toEqual('Hello, World and good day');
      });

    test('read', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient/Patient-1');
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toEqual('Patient-1');
        //expect(res.text).toEqual('Hello, World and good day');
    });

    test('create', async () => {
        const res = await request(TEST_ENDPOINT).post('/fhir/Patient').send(testPatientPayload);
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        console.log(JSON.stringify(res, null, 2));
        expect(res.statusCode).toBe(201);
        currentResourceId = res.body.id;
        //expect(res.text).toEqual('Hello, World and good day');
    });

});