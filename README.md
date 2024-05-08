# Branch Information
This branch is for an implementation to be used during the May 2024 HL7 Connectathon - Vulcan UDP track.
- Google Sheet - https://docs.google.com/spreadsheets/d/1uBYtDOkpKbvGVn0GaCJPJVmvXcIMumAmjmoiu8lXMLY
- Data steward app - https://hl7-vulcan-udp-lab-001.web.app/
- FHIR server public endpoint - https://us-central1-hl7-vulcan-udp-lab-001.cloudfunctions.net/nodejs-http-fn-fhirstore-proxy-service/fhir/metadata
- GCP project id - hl7-vulcan-udp-lab-001

# Background
This project is an end to end guide for spinning up a FHIR sandbox environment in Google Cloud Platform.  In addition to the core FHIR server capabilities this project addresses several common use cases required to support connectathon POCs.

## Use cases to support connetathon POCs
- ability to create and load mock data onto the server with a spreadsheet UI
- public FHIR server (open endpoints)
- ability to extend FHIR server capability by adding custom operations on FHIR resources
- ability to analyze FHIR data with SQL queries
- ability to setup subscriptions (TO DO)
- ability to launch via SMART on FHIR OAuth workflow (TO DO)

## Architecture
![Architecture Diagram](docs/gcp-fhir-sandbox-architecture-diagram.png)

# Try it out
Open the demo UIs.
- Google Sheet - https://docs.google.com/spreadsheets/d/1EfjAuj5o72n2Hc_KKLMD2o4Oteh1LTne2lXanSo_lvk/
- Data steward app - https://gcp-fhir-sandbox-001.web.app/

In the Google Sheet, copy the following row of data into the next blank row in the 'raw_conditions' sheet.
```
TRUE	MY-FIRST-MOCK-RESOURCE	Condition	http://terminology.hl7.org/CodeSystem/condition-clinical	active	Active	http://terminology.hl7.org/CodeSystem/condition-ver-status	confirmed	Confirmed	http://terminology.hl7.org/CodeSystem/condition-category	encounter-diagnosis	Encounter Diagnosis	http://hl7.org/fhir/sid/icd-10-cm	I10	Essential (primary) hypertension	Patient/Patient-1	2020-01-01
```

Refresh [Data steward app](https://gcp-fhir-sandbox-001.web.app/), observe newly added Condition resource, and try to $validate / POST.

Congratulations!  You just created a FHIR resource using Google Sheets.

Continue exploring with the open FHIR server endpoint at: https://us-central1-gcp-fhir-sandbox-001.cloudfunctions.net/nodejs-http-fn-fhirstore-proxy-service/fhir/

# Project setup
Create your own GCP FHIR Sandbox in 15 minutes.  See [INFRA-SETUP](infra-setup/README.md).

# Contributing
All are welcome.  See [CONTIRUBTING](docs/CONTRIBUTING.md)

# License
MIT

# To Do
- Enhance library of Google Sheet resource templates and BigQuery ETL scripts
- Test in connectathon