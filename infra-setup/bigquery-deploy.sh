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
SHEETS_URL="$3" #https://docs.google.com/spreadsheets/d/1EfjAuj5o72n2Hc_KKLMD2o4Oteh1LTne2lXanSo_lvk/

# Update gcloud and enable drive access if running outside of Cloud Shell
# gcloud components update
# gcloud auth login --enable-gdrive-access

# Declare constants
SHEETS_RANGES=(raw_patients raw_conditions) # TO DO: Integrate service to fetch list of sheet names via Drive API
BQ_LOCATION=US
BQ_MOCK_DATA_DATASET_NAME=mock_data

# Select the Google Cloud project that you created
gcloud config set project $PROJECT_ID

echo "$USER_EMAIL $PROJECT_ID $SHEETS_URL"

# Create a BigQuery Dataset for mock data
echo "Enabling BigQuery API and creating BigQuery dataset for mock data..."
gcloud services enable bigquery.googleapis.com
bq --location=$BQ_LOCATION mk -d $BQ_MOCK_DATA_DATASET_NAME

# Create BigQuery table definition files and corresponding BigQuery tables
for element in "${SHEETS_RANGES[@]}"; do
    echo "Creating table definition for $element..."
    # Construct the table definition for each sheet and save to local directory
    table_def='{
    "autodetect": true,
    "sourceFormat": "GOOGLE_SHEETS",
    "sourceUris": [
        "'"$SHEETS_URL"'"
    ],
    "googleSheetsOptions": {
        "range": "'"$element"'"
    }
    }'

    # Output table definition to json file
    echo "$table_def" > infra-setup/bigquery-table-definitions/$element.json

    # Create BigQuery table from table definition file
    echo "Creating BigQuery table for $element..."
    bq mk --external_table_definition="./infra-setup/bigquery-table-definitions/$element.json" "$BQ_MOCK_DATA_DATASET_NAME.$element"

done

# Create UDFs

# Create transform views

# Create publish views

exit 1


# Grant roles on the Cloud Healthcare Service Agent required for streaming
PROJECT_NUMBER=$(gcloud projects list --filter=$PROJECT_ID --format="value(PROJECT_NUMBER)")
HEALTHCARE_SERVICE_AGENT=service-$PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$HEALTHCARE_SERVICE_AGENT" --role=roles/bigquery.dataEditor
gcloud projects add-iam-policy-binding $PROJECT_ID --member="serviceAccount:$HEALTHCARE_SERVICE_AGENT" --role=roles/bigquery.jobUser