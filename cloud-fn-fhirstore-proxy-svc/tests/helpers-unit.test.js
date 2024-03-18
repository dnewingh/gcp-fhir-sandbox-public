const {createRequestOptionsForHealthcareAPI} = require('../helpers/index');

describe('Test Helpers', function () {
    test('createRequestOptionsForHealthcareAPI for GET request', () => {
        const req = {
            forwardingUrl: 'https://test.com',
            method: 'GET',
            body: {}
        };

        const expectedResult = {
            url: req.forwardingUrl,
            method: req.method,
            responseType: 'text',
            validateStatus: () => true,
            headers: {"Accept": "*/*"}
        }

        const result = createRequestOptionsForHealthcareAPI(req);       
        
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
    });

    test('createRequestOptionsForHealthcareAPI for POST request', () => {
        const req = {
            forwardingUrl: 'https://test.com',
            method: 'POST',
            body: { resourceType: 'test'}
        };

        const expectedResult = {
            url: req.forwardingUrl,
            method: req.method,
            responseType: 'text',
            validateStatus: () => true,
            data: { resourceType: 'test'},
            headers: {"Accept": "*/*"}
        }

        const result = createRequestOptionsForHealthcareAPI(req);       
        
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
    });

    test('createRequestOptionsForHealthcareAPI for POST request', () => {
        const req = {
            forwardingUrl: 'https://test.com',
            method: 'PATCH',
            body: { resourceType: 'test'}
        };

        const expectedResult = {
            url: req.forwardingUrl,
            method: req.method,
            responseType: 'text',
            validateStatus: () => true,
            data: { resourceType: 'test'},
            headers: {"Content-Type": "application/json-patch+json", "Accept": "*/*"}
        }

        const result = createRequestOptionsForHealthcareAPI(req);       
        
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
    });
});