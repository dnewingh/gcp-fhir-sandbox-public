# To Do
1. Troubleshoot capapability statement: try search method - https://cloud.google.com/healthcare-api/docs/how-tos/fhir-search?hl=en#using_the_search_method_with_get
2. Create visual to show express app running in cloud function which allows unauthenticated requests forwarding requests to Healthcare API endpoint which requires authentication and auth is provided by GoogleAuth client

# Develop from local machine
Create application default credentials file.
```
gcloud auth application-default login
```
https://cloud.google.com/docs/authentication/provide-credentials-adc#google-idp

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

# Setting up local development environment
https://cloud.google.com/docs/authentication/provide-credentials-adc#google-idp

# Inspiration and References
https://medium.com/google-cloud/express-routing-with-google-cloud-functions-36fb55885c68#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkODA2ZjE4NDJiNTg4MDU0YjE4YjY2OWRkMWEwOWE0ZjM2N2FmYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NTkwOTkwMjMzOTMxMDAzNDUiLCJlbWFpbCI6ImRhbm5ld2luZ2hhbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzA4MDQ5NzUxLCJuYW1lIjoiRGFuIE5ld2luZ2hhbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLcVFXOG1MMk1IcHBQMjNSNFFTNnJWQmxCTXZyUjZmNEE1ZmNqUWtGQ1NsUkE9czk2LWMiLCJnaXZlbl9uYW1lIjoiRGFuIiwiZmFtaWx5X25hbWUiOiJOZXdpbmdoYW0iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTcwODA1MDA1MSwiZXhwIjoxNzA4MDUzNjUxLCJqdGkiOiI2NWExMDJkNzQ2MDM3YjAzMDcwMjMzZjQwNGRjYmY5ZGZiNjhhM2RlIn0.Zv-dxIDAVlfFuKaXeV2J-RIuGE7jLRXBVNxXROcyyBTbZJguWudzsgjatWDdwncHd8VvMX3zXq9JrWwnX_wL53znhQ3juYZhbIF47D-1ajFLpamt3aZ5aK0SHy8L4kQrFeTseSl9dFQhFkITn0vv9sXOSdO1GK03eiwJcSu6UdEPxcHB1hx-0z-EnJa1RhVOmcnzDuWZByAMFZeyoGE5Bnt8hhkh5RPeByAcF6vn5y_zOdDo6ZEy5VMunuf6VYcc1vxEZvTMYTyEAfZy3dcy3l0JodVwqENnj0-bpidqezil0GxYtUSxezS8t3rRI5rm4BIDLbGoyntdV75OqPHTjg
https://cloud.google.com/healthcare-api/docs/authentication