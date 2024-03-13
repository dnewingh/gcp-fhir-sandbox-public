SELECT
publishable 
, resourceType
, mockDataRecordId as id
, mock_data.CreatesSingleEntryCodeableConceptObject(clinicalStatusCodingSystem, null, clinicalStatusCodingCode, clinicalStatusCodingDisplay, null, clinicalStatusCodingDisplay) as clinicalStatus
, mock_data.CreatesSingleEntryCodeableConceptObject(verificationStatusCodingSystem, null, verificationStatusCodingCode, verificationStatusCodingDisplay, null, verificationStatusCodingDisplay) as verificationStatus
, [mock_data.CreatesSingleEntryCodeableConceptObject(categoryCodingSystem, null, categoryCodingCode, categoryCodingDisplay, null, categoryCodingDisplay)] as category
, mock_data.CreatesSingleEntryCodeableConceptObject(codeCodingSystem, null, codeCodingCode, codeCodingDisplay, null, codeCodingDisplay) as code
, mock_data.CreatesSimpleReferenceObject(subjectReference, null) as subject
 FROM `gcp-fhir-sandbox-lab-001.mock_data.raw_conditions`