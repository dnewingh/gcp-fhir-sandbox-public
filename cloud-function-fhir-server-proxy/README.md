# Deploy from local machine

Authorize gcloud CLI
https://cloud.google.com/sdk/docs/authorizing
```
gcloud auth login --no-launch-browser
```

Confirm glcoud CLI configuration.
```
gcloud config list
```

Update gcloud config if needed.
```
gcloud init --no-launch-browser---
```


Run the following CLI command to create or update cloud function.  Select y to enable any API services when prompted if not already enabled.
```
gcloud functions deploy nodejs-http-function \
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