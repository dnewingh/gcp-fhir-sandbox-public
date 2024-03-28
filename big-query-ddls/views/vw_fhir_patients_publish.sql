SELECT 
resourceType
, id
, JSON_ARRAY(raceExtensionData, ethnicityExtensionData, birthSexExtensionData) as extension
, identifier
, active
, name
, telecom
, gender
, CAST(birthDate AS string) as birthDate
, address
FROM `mock_data.vw_fhir_patients_transform_001` pat_proc_001
WHERE publishable = true