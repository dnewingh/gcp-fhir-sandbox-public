CREATE OR REPLACE FUNCTION `mock_data.CreateValueCodingExtensionObject`(url STRING, system STRING, code STRING, display STRING) RETURNS STRUCT<url STRING, valueCoding STRUCT<system STRING, code STRING, display STRING>>
OPTIONS (description="Helper function to create an object for an extension entry based on the valueCoding type.") AS (
STRUCT(
  url 
  , STRUCT(
    system
    , code
    , display
  ) as valueCoding
)
);