# Background
This project is an end to end guide for spinning up a FHIR sandbox environment in Google Cloud Platform.  In addition to the core FHIR server capabilities this project addresses several common use cases required to support connectathon POCs.

## Use cases to support connetathon POCs
- ability to create and load mock data onto the server with a spreadsheet UI
- public FHIR server (open endpoints)
- ability to extend FHIR server capability by adding custom operations on FHIR resources
- ability to analyze FHIR data with SQL queries
- ability to setup subscriptions (TO DO)
- ability to launch via SMART on FHIR OAuth workflow

## Architecture
![Architecture Diagram](docs/gcp-fhir-sandbox-architecture-diagram.png)

# Try it out
- Data steward app - https://gcp-fhir-sandbox-001.web.app/
- Connected Google Sheet - https://docs.google.com/spreadsheets/d/1EfjAuj5o72n2Hc_KKLMD2o4Oteh1LTne2lXanSo_lvk/
- Open FHIR server endpoint - https://us-central1-gcp-fhir-sandbox-001.cloudfunctions.net/nodejs-http-fn-fhirstore-proxy-service/fhir/

# Project setup
Create your own GCP FHIR Sandbox in 15 minutes.  See [INFRA-SETUP](infra-setup/README.md).

# Contributing
All are welcome.  See [CONTIRUBTING](docs/CONTRIBUTING.md)

# License
MIT

# To Do
- Enhance library of Google Sheet resource templates and BigQuery ETL scripts.