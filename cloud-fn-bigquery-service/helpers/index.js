function parseNestedStrings(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            try {
                obj[key] = JSON.parse(obj[key]);
            } catch (error) {
                // If parsing fails, leave it as is
            }
        } else if (typeof obj[key] === 'object') {
            parseNestedStrings(obj[key]); // Recursively parse nested objects
        }
    }
    return obj;
}

function parseNestedStringsFromArrayOfObjects(arr) {
    return arr.map(obj => parseNestedStrings(obj));
  }

function parseJSONWithNestedStrings(jsonString) {
    const parsed = JSON.parse(jsonString);
    return parseNestedStrings(parsed);
}

function dropNullProperties(obj) {
    for (const key in obj) {
        if (obj[key] === null) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            dropNullProperties(obj[key]); // Recursively call dropNullProperties
            // Check if the object became empty after recursive deletion
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        }
    }
    return obj;
}

function convertPostalCodeToString(obj) {
    for (const key in obj) {
        if (key === 'postalCode' && typeof obj[key] === 'number') {
            obj[key] = obj[key].toString(); // Convert number to string
        } else if (typeof obj[key] === 'object') {
            convertPostalCodeToString(obj[key]); // Recursively call convertPostalCodeToString
        }
    }
    return obj;
}

module.exports = {
    parseNestedStrings,
    parseNestedStringsFromArrayOfObjects,
    dropNullProperties,
    convertPostalCodeToString
  };