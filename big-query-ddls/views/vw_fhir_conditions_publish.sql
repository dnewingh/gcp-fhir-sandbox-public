SELECT 
resourceType
, id
, clinicalStatus
, verificationStatus
, category
, code
, subject
FROM `mock_data.vw_fhir_conditions_transform_001`
WHERE publishable = true