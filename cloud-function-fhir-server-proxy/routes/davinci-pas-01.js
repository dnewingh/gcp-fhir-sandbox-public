const functions = require('@google-cloud/functions-framework');
const google = require('@googleapis/healthcare');
const fhirpath = require("fhirpath");

function getCurrentTimeIntegers () {
  return fhirpath.evaluate({}, "now().toString().replace('-','').replace(':','').substring(0,15)")
}

function extractCollectionBundleEntries (rawPaRequestBundle) {
  return fhirpath.evaluate(rawPaRequestBundle, 'Bundle.entry.resource');
}

function buildBaseClaimResponse (originalClaimBundleEntries, outcomeValue) {
  const reviewedClaimResponse = {
      resourceType: 'ClaimResponse',
      id: fhirpath.evaluate(originalClaimBundleEntries, "Claim.id + '-Res-' + now().toString().replace('-','').replace(':','').substring(0,15)")[0],
      status: 'active',
      type: fhirpath.evaluate(originalClaimBundleEntries, "Claim.type")[0],            
      use: fhirpath.evaluate(originalClaimBundleEntries, "Claim.use")[0],
      patient: fhirpath.evaluate(originalClaimBundleEntries, "Claim.patient")[0],
      created: fhirpath.evaluate('', "today()")[0],
      insurer: fhirpath.evaluate(originalClaimBundleEntries, "Claim.insurer")[0],
      requestor: fhirpath.evaluate(originalClaimBundleEntries, "Claim.provider")[0],
      request: {
          reference: fhirpath.evaluate(originalClaimBundleEntries, "'Claim/' + Claim.id")[0]
      },
      outcome: outcomeValue,
      insurance: fhirpath.evaluate(originalClaimBundleEntries, "Claim.insurance"),
      item: [
          {
              itemSequence: 1,
              extension: [
                  fhirpath.evaluate(originalClaimBundleEntries, "Claim.item.extension.where(url='http://hl7.org/fhir/us/davinci-pas/StructureDefinition/extension-itemTraceNumber')")[0]
              ],
              adjudication: [
                  {
                      category: {
                          coding: [
                              {
                                  system: 'http://terminology.hl7.org/CodeSystem/adjudication',
                                  code: 'submitted'
                              }
                          ]
                      }
                  }
              ]

          }
      ]
  }
  return reviewedClaimResponse;
}

function buildPaRequestCollectionBundle(rawPaRequestBundle, claimReponse) {
  const originalClaimBundleEntries = extractCollectionBundleEntries(rawPaRequestBundle);
  //create id for bundle using current time
  const newBundleId = 'PA-' + getCurrentTimeIntegers();

  const requestIdentifier = fhirpath.evaluate(originalClaimBundleEntries, "Claim.id")[0];
  const bundleTags = fhirpath.evaluate(rawPaRequestBundle, "Bundle.meta.tag");
  console.log('BundleTags: ', bundleTags);

  const originalBundleEntries = JSON.parse(JSON.stringify(fhirpath.evaluate(originalClaimBundleEntries, "where(resourceType!='ClaimResponse')")));

  console.log(originalBundleEntries);
  console.log(originalBundleEntries.map(entry => ({resource: entry})));

  const collectionBundleEntries = [
      {
          resource: claimReponse
      },
      ...originalBundleEntries.map(entry => ({resource: entry}))
  ];

  const paRequestCollectionBundle = {
      resourceType: 'Bundle',
      id: newBundleId,
      type: 'Collection',
      identifier: {
          value: requestIdentifier
      },
      meta: {
        tag: bundleTags
      },
      entry: collectionBundleEntries
  };

  return paRequestCollectionBundle;
}

functions.http('fhirRoutes', async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if (req.method === "OPTIONS") {
      // stop preflight requests here
      res.status(204).send('');
      return;
    }

    const oauthOptions = {
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    };
    const authClient = new google.auth.GoogleAuth(oauthOptions);

    if (req.path == '/.well-known/smart-configuration') {
      const smartConfigurationMetadata = {
          authorization_endpoint: "http://localhost:4000/",
          token_endpoint: "https://my-2nd-fhir-store-proxy-function-h4jmy6zwmq-uc.a.run.app/oauth/token",
          token_endpoint_auth_methods_supported: [
              "client_secret_post",
              "client_secret_basic",
              "private_key_jwt"
          ],
          scopes_supported: [
              "epic.scanning.dmsusername",
              "fhirUser",
              "launch",
              "openid",
              "profile"
          ],
          response_types_supported: [
              "code"
          ],
          capabilities: [
              "launch-ehr",
              "launch-standalone",
              "client-public",
              "client-confidential-symmetric",
              "context-banner",
              "context-style",
              "context-ehr-patient",
              "context-ehr-encounter",
              "context-standalone-patient",
              "permission-offline",
              "permission-patient",
              "permission-user",
              "sso-openid-connect"
          ]
      };
      res.json(smartConfigurationMetadata);
    } else if (req.path == '/oauth/token') {
      const tokenData = {
          access_token: "ACCESS_TOKEN",
          token_type: "Bearer",
          expires_in: 3600,
          scope: "user/AdverseEvent.Read user/AdverseEvent.read user/AllergyIntolerance.Read user/AllergyIntolerance.read user/AllergyIntolerance.write user/Appointment.Read user/Appointment.Write user/Appointment.read user/Binary.Read user/Binary.read user/BodyStructure.read user/CarePlan.Read user/CarePlan.read user/CareTeam.read user/Communication.read user/Communication.write user/Condition.Read user/Condition.Write user/Condition.read user/Condition.write user/Consent.read user/Coverage.read user/Device.Read user/Device.read user/DeviceRequest.read user/DeviceUseStatement.read user/DiagnosticReport.Read user/DiagnosticReport.read user/DocumentReference.Read user/DocumentReference.read user/DocumentReference.write user/Encounter.Read user/Encounter.read user/Endpoint.read user/EpisodeOfCare.read user/ExplanationOfBenefit.Read user/ExplanationOfBenefit.read user/FamilyMemberHistory.Read user/FamilyMemberHistory.read user/Flag.read user/Goal.Read user/Goal.Write user/Goal.read user/Group.read user/Immunization.Read user/Immunization.read user/ImmunizationRecommendation.read user/List.read user/Location.read user/Medication.Read user/Medication.read user/MedicationAdministration.read user/MedicationDispense.read user/MedicationOrder.Read user/MedicationRequest.Read user/MedicationRequest.read user/MedicationStatement.Read user/MedicationStatement.read user/NutritionOrder.read user/Observation.Read user/Observation.Write user/Observation.read user/Observation.write user/Organization.read user/Patient.Read user/Patient.read user/Patient.write user/Practitioner.Read user/Practitioner.read user/PractitionerRole.read user/Procedure.Read user/Procedure.read user/ProcedureRequest.Read user/ProcedureRequest.read user/Provenance.read user/Questionnaire.read user/QuestionnaireResponse.Read user/QuestionnaireResponse.write user/RelatedPerson.Read user/RequestGroup.read user/ResearchStudy.Read user/ResearchStudy.read user/ResearchSubject.read user/Schedule.read user/ServiceRequest.read user/Slot.read user/Specimen.Read user/Specimen.read user/Substance.Read user/Substance.read user/Task.read user/Task.write user/ValueSet.Read fhirUser launch/patient openid",
          state: "AHOWEYODUbpMReAZ1",
          id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6InRvVzlqTVVTTi81L0wzaXdhUUdkVG1ORHVodnAvSmNBWlZIL2NPSjZPckU9IiwidHlwIjoiSldUIn0.eyJhdWQiOiIwYTAxOGQxNi04MGU3LTRiMzMtYmRlNy0zODJkOTE5M2VmNjciLCJleHAiOjE2Nzc3MDE5MTEsImZoaXJVc2VyIjoiaHR0cHM6Ly9maGlyLmVwaWMuY29tL2ludGVyY29ubmVjdC1maGlyLW9hdXRoL2FwaS9GSElSL1I0L1ByYWN0aXRpb25lci9lM01CWENPbWNvTEtsN2F5TEQ1MUFXQTMiLCJpYXQiOjE2Nzc3MDE2MTEsImlzcyI6Imh0dHBzOi8vZmhpci5lcGljLmNvbS9pbnRlcmNvbm5lY3QtZmhpci1vYXV0aC9vYXV0aDIiLCJzdWIiOiJlM01CWENPbWNvTEtsN2F5TEQ1MUFXQTMifQ.qTbZbUCGhwXQHW1AsUl7j6VjGo5OsAz328VlhAk78xN3G0Deb7QBRltnq55KI6-UscbNCkpusQSWTMtxS7E9Zd1TH9QVPkUtwEYX83mGHf6GRlEDYqnr3HtsgMKoQflvQHmHjFswgZJ4gFfQBUHgtT3I7AzW4m2WQ18lKrSFZloYyM2IQbsChgjd5fAqPa1xq7jjb1VrEciFvQ-0_aVFXRPXSZvkT_vjaBRJk5EBQJ0P67murh6_GkhZIVsgq9zL0HFp2RjdCAyCGJveQEDg5UttxT_2RuHKxgSeZNPkQ8o-S1ZpRd1qXW9VirEfoBEedlpTdx0ScYdKw4W4TDggVg",
          patient: "example2"
      };
      res.json(tokenData);
    } else if (req.path == '/Claim/$submit' && req.method == 'POST') {
      const reqBundleEntries = extractCollectionBundleEntries(req.body);
      const pendingClaimResponse = buildBaseClaimResponse(reqBundleEntries, 'queued');
      const paRequestCollectionBundle = buildPaRequestCollectionBundle(req.body, pendingClaimResponse);
      const putPath = '/Bundle/' + fhirpath.evaluate(paRequestCollectionBundle, "Bundle.id")

      const reqOptions = {
        url: 'https://healthcare.googleapis.com/v1/projects/my-first-fhir-store/locations/us-central1/datasets/my-first-healthcare-dataset/fhirStores/my-first-fhir-data-store/fhir' + putPath,
        method: 'PUT',
        data: paRequestCollectionBundle
      };

      const client = await authClient.getClient();
      const response = await client.request(reqOptions);
      res.json(response.data);

    } else if (req.path == '/Claim/$inquire' && req.method == 'POST') {
      const reqBundleEntries = extractCollectionBundleEntries(req.body);
      const getPath = '/Bundle?identifier=' + fhirpath.evaluate(reqBundleEntries, "Claim.id")

      const reqOptions = {
        url: 'https://healthcare.googleapis.com/v1/projects/my-first-fhir-store/locations/us-central1/datasets/my-first-healthcare-dataset/fhirStores/my-first-fhir-data-store/fhir' + getPath,
        method: 'GET'
      };

      const client = await authClient.getClient();
      const response = await client.request(reqOptions);
      res.json(response.data);

    } else if (req.path != '/') {
      const reqOptions = {
        url: 'https://healthcare.googleapis.com/v1/projects/my-first-fhir-store/locations/us-central1/datasets/my-first-healthcare-dataset/fhirStores/my-first-fhir-data-store/fhir' + req.path,
        method: req.method,
        params: req.query
      };
      if (req.method == 'POST' || req.method == 'PUT') {
        reqOptions.data = req.body;
      }
      const client = await authClient.getClient();
      const response = await client.request(reqOptions);
      res.json(response.data);
    } else if (req.path == '/' && req.method == 'POST') { //route to handle bundle transactions
      const reqOptions = {
        url: 'https://healthcare.googleapis.com/v1/projects/my-first-fhir-store/locations/us-central1/datasets/my-first-healthcare-dataset/fhirStores/my-first-fhir-data-store/fhir' + req.path,
        method: req.method,
        data: req.body
      };
      const client = await authClient.getClient();
      const response = await client.request(reqOptions);
      res.json(response.data);
    } else { //fallback with metadata statement
      const resourceType = 'metadata';
      const url = 'https://healthcare.googleapis.com/v1/projects/my-first-fhir-store/locations/us-central1/datasets/my-first-healthcare-dataset/fhirStores/my-first-fhir-data-store/fhir/' + resourceType;
      const params = req.query;
      const client = await authClient.getClient();
      const response = await client.request({url, method: 'GET', params});
      res.json(response.data);
    }
  } catch (error) {
    res.json({message: error})
  }

});