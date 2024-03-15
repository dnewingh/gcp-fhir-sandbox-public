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

module.exports = {
    parseNestedStrings,
    parseNestedStringsFromArrayOfObjects
  };