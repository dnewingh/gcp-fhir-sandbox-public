# Setting up local development environment
Note: ADC scopes to Google Drive must be explicitly requested.  Typical ADC login only provides Cloud Platform scopes.
```
gcloud auth application-default login --scopes=https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/cloud-platform
```
- https://github.com/googleapis/google-auth-library-python/issues/1204