#!/bin/bash

# Check if the number of parameters is less than 1
if [ "$#" -lt 1 ]; then
    echo "Error: Google account email address not provided."
    echo "Usage: $0 <email> <projectId> <sheetsUrl>"
    exit 1
fi

# Check if the number of parameters is exactly 1
if [ "$#" -eq 1 ]; then
    echo "Error: GCP project ID not provided."
    echo "Usage: $0 <email> <projectId> <sheetsUrl>"
    exit 1
fi

# Check if the number of parameters is exactly 2
if [ "$#" -eq 2 ]; then
    echo "Error: Google sheets URL not provided."
    echo "Usage: $0 <email> <projectId> <sheetsUrl>"
    exit 1
fi

# Access parameters
USER_EMAIL="$1"
PROJECT_ID="$2" #gcp-fhir-sandbox-001
SHEETS_URL="$3"

# Update gcloud and enable drive access if running outside of Cloud Shell
# gcloud components update
# gcloud auth login --enable-gdrive-access

# Declare constants
DATASET_NAME=GCP-FHIR-Sandbox-001-Healthcare-Dataset-001
FHIRSTORE_NAME=FHIRSTORE-001
BQ_LOCATION=US
BQ_MOCK_DATA_DATASET_NAME=mock_data

# Select the Google Cloud project that you created
gcloud config set project $PROJECT_ID

echo "$USER_EMAIL $PROJECT_ID $SHEETS_URL"

# Call the Node.js functions and store output
output_hello_world=$(node -e "const { getHelloWorld } = require('./infra-setup/gdrive-helpers'); console.log(getHelloWorld());")
output_hello_earth=$(node -e "const { getHelloEarth } = require('./infra-setup/gdrive-helpers'); console.log(getHelloEarth());")

# Print the output
echo "Output from 'getHelloWorld' function: $output_hello_world"
echo "Output from 'getHelloEarth' function: $output_hello_earth"
exit 1

# Create a BigQuery Dataset for mock data
echo "Enabling BigQuery API and creating BigQuery dataset for mock data..."
gcloud services enable bigquery.googleapis.com
bq --location=US mk -d $BQ_MOCK_DATA_DATASET_NAME
# Grant roles on the Cloud Healthcare Service Agent required for streaming
PROJECT_NUMBER=$(gcloud projects list --filter=$PROJECT_ID --format="value(PROJECT_NUMBER)")
HEALTHCARE_SERVICE_AGENT=service-$PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$HEALTHCARE_SERVICE_AGENT" --role=roles/bigquery.dataEditor
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$HEALTHCARE_SERVICE_AGENT" --role=roles/bigquery.jobUser