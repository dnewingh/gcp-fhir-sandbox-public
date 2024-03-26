#!/bin/bash

# Check if the number of parameters is less than 1
if [ "$#" -lt 1 ]; then
    echo "Error: Google account email address not provided."
    echo "Usage: $0 <email> <projectId>"
    exit 1
fi

# Check if the number of parameters is exactly 1
if [ "$#" -eq 1 ]; then
    echo "Error: GCP project ID not provided."
    echo "Usage: $0 <email> <projectId>"
    exit 1
fi

# Access parameters
USER_EMAIL="$1"
PROJECT_ID="$2" #gcp-fhir-sandbox-001

# Declare constants
DATASET_NAME=GCP-FHIR-Sandbox-001-Healthcare-Dataset-001
FHIRSTORE_NAME=FHIRSTORE-001
LOCATION=us-central1
##BQ_STREAMING_DATASET_NAME=fhirstore_resource_streaming_01

# Select the Google Cloud project that you created
gcloud config set project $PROJECT_ID

# Enable the Cloud Functions API
echo "Enabling Cloud Functions API..."
gcloud services enable cloudfunctions.googleapis.com

# Deploy FHIR Store proxy service
echo "Deploying FHIR Store proxy service..."
FHIRSTORE_URL="https://healthcare.googleapis.com/v1/projects/$PROJECT_ID/locations/$LOCATION/datasets/$DATASET_NAME/fhirStores/$FHIRSTORE_NAME"

gcloud functions deploy nodejs-http-fn-fhirstore-proxy-service \
  --gen2 \
  --runtime=nodejs20 \
  --entry-point=app \
  --source cloud-fn-fhirstore-proxy-svc \
  --region=$LOCATION \
  --trigger-http \
  --allow-unauthenticated \
  --timeout=60s \
  --max-instances=83 \
  --set-env-vars FHIRSTORE_URL=$FHIRSTORE_URL

# Grant roles on the Cloud Functions Service Agent required for interacting with FHIR Store API
echo "Granting required roles for interacting with FHIR Store API to cloud functions service account..."
PROJECT_NUMBER=$(gcloud projects list --filter=$PROJECT_ID --format="value(PROJECT_NUMBER)")
COMPUTE_SERVICE_ACCOUNT=$PROJECT_NUMBER-compute@developer.gserviceaccount.com
gcloud healthcare fhir-stores add-iam-policy-binding $FHIRSTORE_NAME \
  --dataset=$DATASET_NAME \
  --member="serviceAccount:$COMPUTE_SERVICE_ACCOUNT" \
  --role=roles/healthcare.fhirResourceEditor
