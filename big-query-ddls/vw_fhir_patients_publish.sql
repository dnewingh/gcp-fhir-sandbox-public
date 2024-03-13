SELECT 
resourceType
, id
, JSON_ARRAY(raceExtensionData, ethnicityExtensionData, birthSexExtensionData) as extension
, identifier
, active
, name
, telecom
, gender
, birthDate
, address
FROM `gcp-fhir-sandbox-lab-001.mock_data.vw_fhir_patients_transform_001` pat_proc_001
WHERE publishable = true