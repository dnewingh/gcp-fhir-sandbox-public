#!/bin/bash

# Declare constants
PROJECT_ID=gcp-fhir-sandbox-001 #YOUR_GCP_PROJECT_ID
USER_EMAIL=dannewingham@gmail.com #YOUR_GOOGLE_ACCOUNT_EMAIL_ADDRESS
DATASET_NAME=GCP-FHIR-Sandbox-001-Healthcare-Dataset-001
FHIRSTORE_NAME=FHIRSTORE-001
LOCATION=us-central1
BQ_STREAMING_DATASET_NAME=fhirstore_resource_streaming_01

# Based on gcloud quickstart guide: https://cloud.google.com/healthcare-api/docs/store-healthcare-data-gcloud
# Select the Google Cloud project that you created
gcloud config set project $PROJECT_ID

# Enable the Cloud Healthcare API
echo "Enabling Cloud Healthcare API..."
gcloud services enable healthcare.googleapis.com

# Grant roles to your Google Account
echo "Granting required roles for fhirStore to your google account..."
gcloud projects add-iam-policy-binding $PROJECT_ID --member="user:$USER_EMAIL" --role=roles/healthcare.datasetAdmin
gcloud projects add-iam-policy-binding $PROJECT_ID --member="user:$USER_EMAIL" --role=roles/healthcare.fhirStoreAdmin

# Create Healthcare Dataset
echo "Creating Healthcare Dataset..."
gcloud healthcare datasets create $DATASET_NAME --location=$LOCATION

# Create a BigQuery Dataset to later configure BigQuery streaming
echo "Enabling BigQuery API and creating BigQuery dataset for streaming"
gcloud services enable bigquery.googleapis.com
bq --location=US mk -d $BQ_STREAMING_DATASET_NAME
# Grant roles on the Cloud Healthcare Service Agent required for streaming
PROJECT_NUMBER=$(gcloud projects list --filter=$PROJECT_ID --format="value(PROJECT_NUMBER)")
HEALTHCARE_SERVICE_AGENT=service-$PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$HEALTHCARE_SERVICE_AGENT" --role=roles/bigquery.dataEditor
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$HEALTHCARE_SERVICE_AGENT" --role=roles/bigquery.jobUser

# Create a FHIR Store
echo "Creating FHIR store..."
gcloud healthcare fhir-stores create $FHIRSTORE_NAME \
  --project=$PROJECT_ID \
  --dataset=$DATASET_NAME \
  --location=$LOCATION \
  --version=R4 \
  --enable-update-create \
  --disable-referential-integrity

echo "Script finished.  Check URL to continue FHIR Store setup.  https://console.cloud.google.com/healthcare/browser/locations/$LOCATION/datasets/$DATASET_NAME/fhirStores/$FHIRSTORE_NAME/details/overview?project=$PROJECT_ID"