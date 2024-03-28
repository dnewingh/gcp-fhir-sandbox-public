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
LOCATION=us-central1

# Create production environment file
echo "Preparing production environment.ts file..."

# Assign arguments to variables
bigQueryServiceUrl="https://$LOCATION-$PROJECT_ID.cloudfunctions.net/nodejs-http-fn-biqquery-service/bigquery/"
fhirstoreServiceUrl="https://$LOCATION-$PROJECT_ID.cloudfunctions.net/nodejs-http-fn-fhirstore-proxy-service/fhir/"

# Define the content of the environment.ts file
environment_content=$(cat <<EOF
export const environment = {
    production: true,
    bigQueryServiceUrl: '$bigQueryServiceUrl',
    fhirstoreServiceUrl: '$fhirstoreServiceUrl'
};
EOF
)

# Specify the file path
file_path="src/environments/environment.ts"

# Create the environment.ts file and write the content
echo "$environment_content" > "$file_path"

# Display a message indicating successful creation
echo "environment.ts file created successfully."
 
# Build and deploy application to firebase
echo "Building app..."
npm install
npm run build

echo "Deploying to firebase..."
firebase deploy --only hosting