CREATE OR REPLACE FUNCTION `gcp-fhir-sandbox-lab-001.mock_data.CreateIdentifierEntryObject`(identifierUse STRING, codingSystem STRING, codingVersion STRING, codingCode STRING, codingDisplay STRING, codingUserSelected BOOL, typeText STRING, identifierSystem STRING, identifierValue STRING) RETURNS STRUCT<use STRING, type STRUCT<coding ARRAY<STRUCT<system STRING, version STRING, code STRING, display STRING, userSelected BOOL>>, text STRING>, system STRING, value STRING> AS (
STRUCT(
    identifierUse
    , STRUCT(
      [
        STRUCT(
          codingSystem as system
          , codingVersion as version
          , codingCode as code
          , codingDisplay as display
          , codingUserSelected as userSelected
        )
      ] as coding    
      , typeText as text
    ) as type
    , identifierSystem as system
    , identifierValue as value
  )
);