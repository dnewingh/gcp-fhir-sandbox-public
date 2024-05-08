# Infrastructure setup
The following guide walks through the steps for provisionoing the necessary project resources in Google Cloud.  Setup is divided into three sections.
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
&& cd my-connectathon-apps \
&& git clone https://github.com/dnewingh/gcp-fhir-sandbox-public.git \
&& cd gcp-fhir-sandbox-public
```

Then, run the FHIR store deployment script with the arguments for your project.  
*Remember to authorize Cloud Shell to use your credentials and select y to enable any API services when prompted if not already enabled.*
```
bash infra-setup/fhirstore-deploy.sh <emailId> <projectId>
```
Once deployment is complete naviate to the URL displayed in the terminal to complete FHIR store configuration in the GCP console.  Refer to [GCP FHIR Sandbox Infra Setup Screenshots](https://docs.google.com/presentation/d/1dIu-QcBRKU1AmX0zTlpUKJ1UxCElbk5o/edit?usp=drive_link&ouid=109859099023393100345&rtpof=true&sd=true) for additional information.

Next, run the FHIR store proxy deployment script with the arguments for your project.
```
bash infra-setup/fhirstore-proxy-deploy.sh <emailId> <projectId>
```

Save the cloud function URL displayed in the terminal.  The `/fhir` route on this URL is the public endpoint for your FHIR server.

## 2. BigQuery Setup
Start by opening and then saving a copy of the following Google Sheets Template to your Google Drive (it should be saved to the Drive of the same account that is the owner of your GCP project).
[Google Sheets Template](https://docs.google.com/spreadsheets/d/12QQ4JjRi05EHmACQk_5n0maIUKF4y32OBpWMlnffJxU/)

After copying, update the Sheet sharing permssions to provide Viewer access to Anyone.  *Note: Instead of setting public viewing access you could alternatively choose to share with the email address of your BigQuery service account.  This is required to allow BigQuery to read your Sheets data and convert it into FHIR resources.*

Then, return to Cloud Shell and run the BigQuery deployment script with the arguments for your project.
```
bash infra-setup/bigquery-deploy.sh <emailId> <projectId> <sheetsUrl>
```

## 3. Firebase setup
First, navigate to https://console.firebase.google.com/ and add a new project. Then select your existing GCP project and complete the remaining steps in the setup wizard.

Return to Cloud Shell, navigate to the Data Steward app directory and login to Firebase by following the prompts.
```
cd ng-data-steward-app \
&& firebase login --no-localhost
```

Then, configure the ng-data-steward-app directory as a firebase project by using the following command and following the prompts.
```
firebase init hosting
```
Options
```
Select a default Firebase project for this directory: <select existing project just created>
What do you want to use as your public directory: dist/ng-data-steward-app/browser
Configure as a single-page app (rewrite all urls to /index.html): y
Set up automatic builds and deploys with GitHub: n
```

Next, execute deployment script.
```
bash ../infra-setup/firebase-deploy.sh <emailId> <projectId>
```

Finally, save the URL displayed in the terminal for your now live Data Steward app!