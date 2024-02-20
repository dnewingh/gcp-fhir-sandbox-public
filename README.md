# Background
This project is an end to end guide for spinning up a FHIR sandbox environment in Google Cloud Platform.  In addition to the core FHIR server capabilities this project addresses several common use cases required to support connectathon POCs.

## Use cases to support connetathon POCs
- public FHIR server (open endpoints)
- ability to create and load mock data onto the server with a spreadsheet like UI
    - 2/15: completed POC with ETL scripts for Patients and Conditions and verified imported successfully.
- ability to extend FHIR server capability by adding custom operations on FHIR resources
- ability to query FHIR data and build data visualizations
- ability to setup subscriptions
- ability to launch via SMART on FHIR OAuth workflow

## GCP FHIR sandbox components list
- Healthcare API
- Pub/Sub
- Big Query
- Cloud Function
- Google Sheets
- Cloud Storage

# Contributing
All are welcome.

# License
MIT

# Notes
- Can setup a cloud function to act as a proxy to the fhir-store
- Requires running the cloud function as a service account who has been added as a principle with FHIR resource editor role on the fhir-store resource

# References
https://stackoverflow.com/questions/47155378/how-can-i-have-multiple-api-endpoints-for-one-google-cloud-function

# General Considerations for a SMART on FHIR simulator
- GCP: easy to spin up Healthcare API but no auth/launcher interface
- smart-launcher: clean interface but only works with smarthealthit public endpoints
    - could possibly substitute with a HAPI server
- Logica sandbox -> distracting EHR launcher
- Epic EHR sandbox -> permissions available on read-only APIs only