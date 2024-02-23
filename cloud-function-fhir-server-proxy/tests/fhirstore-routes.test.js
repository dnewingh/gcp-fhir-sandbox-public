const request = require('supertest');
const testPatientPayload = require('./sample-patient.json');

const TEST_ENDPOINT = 'http://localhost:8080';

describe('Test Handlers', function () {
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

    let currentResourceId;
    test('create', async () => {
        const res = await request(TEST_ENDPOINT).post('/fhir/Patient').send(testPatientPayload);
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //console.log(JSON.stringify(res, null, 2));
        expect(res.statusCode).toBe(201);
        currentResourceId = res.body.id;
        //expect(res.text).toEqual('Hello, World and good day');
    });

    test('read', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient/' + currentResourceId);
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toEqual(currentResourceId);
        //expect(res.text).toEqual('Hello, World and good day');
    });

    test('update', async () => {
        const updatedTestPatientPayload = testPatientPayload;
        updatedTestPatientPayload.id = currentResourceId;
        updatedTestPatientPayload.active = false;

        const res = await request(TEST_ENDPOINT)
            .put('/fhir/Patient/'+ currentResourceId)
            .send(updatedTestPatientPayload);
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //console.log(JSON.stringify(res, null, 2));
        expect(res.statusCode).toBe(200);
        
    });

    test('patch', async () => {
        const jsonPatchPayload = [{op: 'replace', path: '/active', value: true}];

        const res = await request(TEST_ENDPOINT)
            .patch('/fhir/Patient/'+ currentResourceId)
            .set('Content-Type', 'application/json-patch+json')
            .send(jsonPatchPayload);
        
        console.log(JSON.stringify(res, null, 2));
        expect(res.statusCode).toBe(200);
        
    });

    let currentResourceVersion;
    test('history', async () => {
        const res = await request(TEST_ENDPOINT)
            .get('/fhir/Patient/'+ currentResourceId + '/_history') 
            expect(res.statusCode).toBe(200);
            expect(res.body.total).toEqual(3);

        currentResourceVersion = res.body.entry[1].resource.meta.versionId;
    });

    test('vread', async () => {
        const res = await request(TEST_ENDPOINT)
            .get('/fhir/Patient/'+ currentResourceId + '/_history/' + currentResourceVersion) 
            expect(res.statusCode).toBe(200);
            expect(res.body.meta.versionId).toEqual(currentResourceVersion);
    });

});