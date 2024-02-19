CREATE OR REPLACE FUNCTION `gcp-fhir-sandbox-lab-001.mock_data.CreatesSimpleReferenceObject`(reference STRING, display STRING) RETURNS STRUCT<reference STRING, display STRING>
OPTIONS (description="Helper function to create an object based on the Reference element.") AS (
STRUCT(
    reference
    , display
  )
);