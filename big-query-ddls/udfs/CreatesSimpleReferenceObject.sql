CREATE OR REPLACE FUNCTION `mock_data.CreatesSimpleReferenceObject`(reference STRING, display STRING) RETURNS STRUCT<reference STRING, display STRING>
OPTIONS (description="Helper function to create an object based on the Reference element.") AS (
STRUCT(
    reference
    , display
  )
);