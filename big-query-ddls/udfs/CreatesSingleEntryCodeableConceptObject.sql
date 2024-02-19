CREATE OR REPLACE FUNCTION `gcp-fhir-sandbox-lab-001.mock_data.CreatesSingleEntryCodeableConceptObject`(system STRING, version STRING, code STRING, display STRING, userSelected BOOL, text STRING) RETURNS STRUCT<coding ARRAY<STRUCT<system STRING, version STRING, code STRING, display STRING, userSelected BOOL>>, text STRING>
OPTIONS (description="Helper function to create an object based on the CodeableConcept type.") AS (
STRUCT(
  [
    STRUCT(
      system
      , version
      , code
      , display
      , userSelected
    ) 
  ] as coding
  , text
)
);