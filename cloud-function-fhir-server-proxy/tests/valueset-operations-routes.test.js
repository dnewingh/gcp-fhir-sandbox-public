const request = require('supertest');

const testExpandedValuesetResponse = require("./sample-expanded-valueset.json");

const TEST_ENDPOINT = 'http://localhost:8080';

/*

Verify behavior of custom routes implemented for ValueSet operations.
https://build.fhir.org/valueset-operations.html

*/

describe('ValueSet Operations', function () {
    test('expand existant ValueSet', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/ValueSet/procedure-category/\$expand');
        //console.log(req);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body).toEqual(testExpandedValuesetResponse);
      });
    
    test('expand non-existant ValueSet', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/ValueSet/invalid-resourceId/\$expand');
        //console.log(req);
        expect(res.statusCode).toBe(404);
        console.log(res.body);
        expect(res.body.resourceType).toEqual('OperationOutcome');
      });
});