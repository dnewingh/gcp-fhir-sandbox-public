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
            method: req.method
        }

        const result = createRequestOptionsForHealthcareAPI(req);       
        
        expect(result).toEqual(expectedResult);
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
            data: { resourceType: 'test'}
        }

        const result = createRequestOptionsForHealthcareAPI(req);       
        
        expect(result).toEqual(expectedResult);
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
            data: { resourceType: 'test'},
            headers: {"Content-Type": "application/json-patch+json"}
        }

        const result = createRequestOptionsForHealthcareAPI(req);       
        
        expect(result).toEqual(expectedResult);
    });
});