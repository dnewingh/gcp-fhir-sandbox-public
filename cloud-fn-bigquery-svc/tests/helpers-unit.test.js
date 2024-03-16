const { parseNestedStrings, parseNestedStringsFromArrayOfObjects } = require("../helpers");

describe('Test Helpers', function () {
    // Example usage:
    const extArr = [
        {
            extName: 'ext1',
            extUrl: 'www'
        },
        {
            extName: 'ext2',
            extCode: 12
        }
    ];
    const inputObj1 = { name: "John", age: 30, extension: JSON.stringify(extArr) };
    const inputObj2 = { name: "Sue", age: 30, extension: JSON.stringify(extArr) };

    const inputArray = [ inputObj1, inputObj2 ];

    test('Parsing stringified properties', () => {
        const expectedResult = { name: "John", age: 30, extension: extArr };

        const result = parseNestedStrings(inputObj1);       
        
        expect(result).toEqual(expectedResult);
    });

    test('Parsing array of objects with stringified properties', () => {
        const expectedResult = [
            { name: "John", age: 30, extension: extArr },
            { name: "Sue", age: 30, extension: extArr }
        ];

        const result = parseNestedStringsFromArrayOfObjects(inputArray);
        
        expect(result).toEqual(expectedResult);
    });
    
});