# Infrastructure setup
The following guide walks through the steps for provisionoing the necessary resources for this project in Google Cloud.  Setup is divided into four sections.
1. FHIR Store Setup - Covers configuration and deployment of FHIR Server Services
2. BigQuery Setup - Covers configuration and deployment of Data Preparation and Analysis Services
3. Firebase Setup - Covers configuration and deployment of Data Stewardship Services

![Architecture Diagram](../docs/gcp-fhir-sandbox-architecture-diagram.png)

## Pre-requisites
- A new GCP project has already been created and the project is linked to a billing account.  Create a Google account and get started for free if it is your first time using GCP (https://cloud.google.com/free).
- Project owner is logged in and has activated Cloud Shell in order to run the following commands.

## 1. FHIR Store Setup
From Cloud Shell start by cloning the repo.
```
mkdir my-connectathon-apps \
cd my-connectathon-apps \
git clone https://github.com/dnewingh/gcp-fhir-sandbox-public.git \
cd gcp-fhir-sandbox-public
```

Then run the FHIR store deployment script with the arguments for your project.  
*Remember to authorize Cloud Shell to use your credentials and select y to enable any API services when prompted if not already enabled.*
```
bash infra-setup/fhirstore-deploy.sh <emailId> <projectId>
```
Once deployment is complete naviate to the URL displayed in the terminal to complete FHIR store configuration in the GCP console.  Refer to [GCP FHIR Sandbox Infra Setup Screenshots](https://docs.google.com/presentation/d/1dIu-QcBRKU1AmX0zTlpUKJ1UxCElbk5o/edit?usp=drive_link&ouid=109859099023393100345&rtpof=true&sd=true) for additional information.

Next run the FHIR store proxy deployment script with the arguments for your project.
```
bash infra-setup/fhirstore-proxy-deploy.sh <emailId> <projectId>
```

Save the URL displayed in the terminal as the public endpoint for your FHIR server.

## 2. BigQuery Setup
Start by saving a copy of the following Google Sheets Template to your Google Drive (it should be saved to the Drive of the same account that is the owner of your GCP project).
After copying, update the Sheet sharing permssions to provide Viewer access to Anyone.  *Note: Instead of setting public viewing access you could alternatively choose to share with the email address of your BigQuery service account.  This is required to allow BigQuery to read your Sheets data and convert it into FHIR resources.*

Then run the BigQuery deployment script with the arguments for your project.
```
bash infra-setup/bigquery-deploy.sh <emailId> <projectId> <sheetsUrl>
```

## 3. Firebase setup





```
bash infra-setup/big-query-deploy.sh
```
```
bash infra-setup/cloud-fns-deploy.sh
```