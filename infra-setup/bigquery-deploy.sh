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
TEMP_TABLE_DEFINITIONS_DIRECTORY=infra-setup/tmp-bigquery-table-definitions
UDF_DEFINITIONS_DIRECTORY=big-query-ddls/udfs
VIEW_DEFINITIONS_DIRECTORY=big-query-ddls/views
LOCATION=us-central1

# Select the Google Cloud project that you created
gcloud config set project $PROJECT_ID

#echo "$USER_EMAIL $PROJECT_ID $SHEETS_URL"

# Create a BigQuery Dataset for mock data
echo "Enabling BigQuery API and creating BigQuery dataset for mock data..."
gcloud services enable bigquery.googleapis.com
bq --location=$BQ_LOCATION mk -d $BQ_MOCK_DATA_DATASET_NAME

# Create BigQuery table definition files and corresponding BigQuery tables
mkdir -p $TEMP_TABLE_DEFINITIONS_DIRECTORY
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
    echo "$table_def" > $TEMP_TABLE_DEFINITIONS_DIRECTORY/$element.json

    # Create BigQuery table from table definition file
    echo "Creating BigQuery table for $element..."
    bq mk --external_table_definition="$TEMP_TABLE_DEFINITIONS_DIRECTORY/$element.json" "$BQ_MOCK_DATA_DATASET_NAME.$element"

done

# Create UDFs
echo "Creating UDFs..."
# Loop through sql files in the UDFs directory
for file in "$UDF_DEFINITIONS_DIRECTORY"/*.sql; do
    # Allow contents of SQL file to be read into a variable by escaping backticks
    echo "Executing query $file"
    file_contents=$(sed 's/`/\\`/g' "$file")
    # Unescape the file_contents before passing value to bq command
    unescaped_query=$(echo "$file_contents" | sed 's/\\//g')

    # Execute query
    bq query --nouse_legacy_sql $unescaped_query
done

# Create transform views
echo "Creating transform views..."
# Loop through transform sql files in the views directory
for file in "$VIEW_DEFINITIONS_DIRECTORY"/*transform*.sql; do
    # Allow contents of SQL file to be read into a variable by escaping backticks
    echo "Executing query $file"
    file_contents=$(sed 's/`/\\`/g' "$file")
    # Unescape the file_contents before passing value to bq command
    unescaped_query=$(echo "$file_contents" | sed 's/\\//g')
    
    # Create view
    bq mk \
        --nouse_legacy_sql \
        --view \ "$unescaped_query" \
        "$BQ_MOCK_DATA_DATASET_NAME.$(basename $file .sql)"    
done

# Create publish views
echo "Creating publish views..."
# Loop through publish sql files in the views directory
for file in "$VIEW_DEFINITIONS_DIRECTORY"/*publish*.sql; do
    # Allow contents of SQL file to be read into a variable by escaping backticks
    echo "Executing query $file"
    file_contents=$(sed 's/`/\\`/g' "$file")
    # Unescape the file_contents before passing value to bq command
    unescaped_query=$(echo "$file_contents" | sed 's/\\//g')
    
    # Create view
    bq mk \
        --nouse_legacy_sql \
        --view \ "$unescaped_query" \
        "$BQ_MOCK_DATA_DATASET_NAME.$(basename $file .sql)"    
done

# Deploy BigQuery service
echo "Deploying BigQuery service to cloud function..."
BIGQUERY_URL="https://bigquery.googleapis.com/bigquery/v2/projects/$PROJECT_ID/"

# Enable the Cloud Functions API
gcloud services enable cloudfunctions.googleapis.com

gcloud functions deploy nodejs-http-fn-biqquery-service \
  --gen2 \
  --runtime=nodejs20 \
  --entry-point=app \
  --source cloud-fn-bigquery-svc \
  --region=$LOCATION \
  --trigger-http \
  --allow-unauthenticated \
  --timeout=60s \
  --max-instances=83 \
  --set-env-vars "BIGQUERY_URL=$BIGQUERY_URL, SHEETS_URL=$SHEETS_URL"