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
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(testExpandedValuesetResponse);
      });
    
    test('expand non-existant ValueSet', async () => {
        const res = await request(TEST_ENDPOINT).get('/fhir/ValueSet/invalid-resourceId/\$expand');
        
        expect(res.statusCode).toBe(404);
        expect(res.body.resourceType).toEqual('OperationOutcome');
      });

    test('get ValueSet by resourceId', async () => {
      const res = await request(TEST_ENDPOINT).get('/fhir/ValueSet/procedure-category');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.resourceType).toEqual('ValueSet');
    });
});