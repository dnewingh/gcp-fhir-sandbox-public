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

Run the following CLI command to create or update cloud function.  Select y to enable any API services when prompted if not already enabled.
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
  --max-instances=83
```