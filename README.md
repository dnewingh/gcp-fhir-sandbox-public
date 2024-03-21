# Background
This project is an end to end guide for spinning up a FHIR sandbox environment in Google Cloud Platform.  In addition to the core FHIR server capabilities this project addresses several common use cases required to support connectathon POCs.

## Use cases to support connetathon POCs
- ability to create and load mock data onto the server with a spreadsheet UI
- public FHIR server (open endpoints)
- ability to extend FHIR server capability by adding custom operations on FHIR resources
- ability to analyze FHIR data with SQL queries
- ability to setup subscriptions
- ability to launch via SMART on FHIR OAuth workflow

## Architecture
![Architecture Diagram](docs/gcp-fhir-sandbox-architecture-diagram.png)

# Contributing
All are welcome.

# License
MIT

# References
- GCP Architecture Diagramming Tool: https://cloud.google.com/blog/topics/developers-practitioners/introducing-google-cloud-architecture-diagramming-tool
https://stackoverflow.com/questions/47155378/how-can-i-have-multiple-api-endpoints-for-one-google-cloud-function

# General Considerations for a SMART on FHIR simulator
- GCP: easy to spin up Healthcare API but no auth/launcher interface
- smart-launcher: clean interface but only works with smarthealthit public endpoints
    - could possibly substitute with a HAPI server
- Logica sandbox -> distracting EHR launcher
- Epic EHR sandbox -> read-only permissions available

# To Do
- Ng admin app with ability to post/put
- Shell script for cli setup and implementation of environment variables
- Blog post