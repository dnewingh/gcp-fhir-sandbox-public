const request = require('supertest');
const testPatientPayload = require('./sample-patient.json');
const testProcedurePayload = require('./sample-procedure.json');

const TEST_ENDPOINT = 'http://localhost:8080';

/*

Verify behavior of all GCP fhirStore methods.
https://cloud.google.com/healthcare-api/docs/reference/rest/v1/projects.locations.datasets.fhirStores.fhir

*/

describe('FHIRSTORE Methods', function () {
    test('root directory for 200 status code', async () => {
        const res = await request(TEST_ENDPOINT).get('/');
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        //expect(res.text).toEqual('Hello, World and good day');
      });

    test('read', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/metadata');
        expect(res.statusCode).toBe(200);
        expect(res.body.resourceType).toEqual('CapabilityStatement');
    });

    let currentResourceId;
    test('create', async () => {
        const res = await request(TEST_ENDPOINT).post('/fhir/Patient').send(testPatientPayload);
        expect(res.statusCode).toBe(201);
        currentResourceId = res.body.id;
    });

    test('read', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient/' + currentResourceId);
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toEqual(currentResourceId);
    });

    test('searchGET', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient?_id=' + currentResourceId);        
        expect(res.statusCode).toBe(200);
        expect(res.body.entry[0].resource.id).toEqual(currentResourceId);
    });

    test('searchPOST', async () => {
        const res = await request(TEST_ENDPOINT).post('/fhir/Patient/_search?_id=' + currentResourceId);
        expect(res.statusCode).toBe(200);
        expect(res.body.entry[0].resource.id).toEqual(currentResourceId);
    });

    test('search-type', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir?_type=Patient');        
        expect(res.statusCode).toBe(200);
        expect(res.body.total).toBeGreaterThan(0);
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
        
        //console.log(JSON.stringify(res, null, 2));
        expect(res.statusCode).toBe(200);
        
    });

    let currentResourceVersion;
    test('history', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient/'+ currentResourceId + '/_history') 

        expect(res.statusCode).toBe(200);
        expect(res.body.total).toEqual(3);

        currentResourceVersion = res.body.entry[1].resource.meta.versionId;
    });

    test('vread', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient/'+ currentResourceId + '/_history/' + currentResourceVersion) 
        
        expect(res.statusCode).toBe(200);
        expect(res.body.meta.versionId).toEqual(currentResourceVersion);
    });

    test('resource-purge', async () => {
        const res = await request(TEST_ENDPOINT).delete('/fhir/Patient/'+ currentResourceId + '/$purge')        
        expect(res.statusCode).toBe(200);

        const resAfterPurge = await request(TEST_ENDPOINT).get('/fhir/Patient/'+ currentResourceId + '/_history') 
        expect(resAfterPurge.body.total).toEqual(1);
    });

    test('updateCreate and conditionalUpdate', async () => {
        const updatedTestProcedurePayload = testProcedurePayload;
        updatedTestProcedurePayload.subject = { reference: 'Patient/' + currentResourceId };
        updatedTestProcedurePayload.identifier = [
            {
              system : "https://testing-mrn.co",
              value : currentResourceId
            }
          ];

        //create resource
        const res = await request(TEST_ENDPOINT)
            .put('/fhir/Procedure?identifier='+ currentResourceId)
            .send(updatedTestProcedurePayload);
        expect(res.statusCode).toBe(201);
        const createdProcedureResourceId = res.body.id;

        //update resource using same method
        updatedTestProcedurePayload.status = 'in-progress';
        const resAfterUpdate = await request(TEST_ENDPOINT)
            .put('/fhir/Procedure?identifier='+ currentResourceId)
            .send(updatedTestProcedurePayload);
        expect(resAfterUpdate.statusCode).toBe(200);

        //verify two versions of resource exist
        const resHistoryAfterPurge = await request(TEST_ENDPOINT).get('/fhir/Procedure/'+ createdProcedureResourceId + '/_history')
        expect(resHistoryAfterPurge.body.total).toEqual(2);
        
    });

    test('conditionalPatch', async () => {
        const jsonPatchPayload = [{op: 'replace', path: '/status', value: 'completed'}];

        const resMatchFound = await request(TEST_ENDPOINT)
            .patch('/fhir/Procedure?identifier='+ currentResourceId)
            .set('Content-Type', 'application/json-patch+json')
            .send(jsonPatchPayload);
        
        //console.log(JSON.stringify(res, null, 2));
        expect(resMatchFound.statusCode).toBe(200);

        const resMatchNotFound = await request(TEST_ENDPOINT)
            .patch('/fhir/Procedure?identifier='+ currentResourceId + '999')
            .set('Content-Type', 'application/json-patch+json')
            .send(jsonPatchPayload);
        
        //console.log(JSON.stringify(resMatchNotFound, null, 2));
        expect(resMatchNotFound.statusCode).toBe(404);
        
    });

    test('patient-everything', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/Patient/' + currentResourceId + '/$everything');
        //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        //console.log(JSON.stringify(res.body, null, 2));
        expect(res.statusCode).toBe(200);
        expect(res.body.total).toEqual(2);
    });

    

});