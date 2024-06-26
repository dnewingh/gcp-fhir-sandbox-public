# To Do
- Figure out approach for setting environment variables for project Id

# Setting up local development environment
Note: ADC scopes to Google Drive must be explicitly requested.  Typical ADC login only provides Cloud Platform scopes.
```
gcloud auth application-default login --scopes=https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/cloud-platform
```
- https://github.com/googleapis/google-auth-library-python/issues/1204

# Deploy from local machine

Authorize gcloud CLI
https://cloud.google.com/sdk/docs/authorizing
```
gcloud auth login --no-launch-browser
```

Confirm glcoud CLI configuration (default project etc).
```
gcloud config list
```

Update gcloud config if needed.
```
gcloud init --no-launch-browser---
```

## Project setup
```
npm install
```

### Environment variables
Create .env file in root directory with BigQuery and Sheets URLs.
```
BIGQUERY_URL='YOUR_BIGQUERY_URL'
SHEETS_URL='YOUR_SHEETS_URL'
```

Run the following CLI command to create or update cloud function.  Select y to enable any API services when prompted if not already enabled.  NOTE: Update last parameter with YOUR_BIGQUERY_URL and YOUR_SHEETS_URL before executing.
```
gcloud functions deploy nodejs-http-fn-biqquery-service \
  --gen2 \
  --runtime=nodejs20 \
  --entry-point=app \
  --source . \
  --region=us-central1 \
  --trigger-http \
  --allow-unauthenticated \
  --timeout=60s \
  --max-instances=83 \
  --set-env-vars "BIGQUERY_URL=YOUR_BIGQUERY_URL, SHEETS_URL=YOUR_SHEETS_URL"
```