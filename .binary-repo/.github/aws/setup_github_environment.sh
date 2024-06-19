#!/bin/bash

# Check if correct number of arguments are provided
if [ "$#" -ne 5 ]; then
  echo "Usage: $0 <repo_owner> <repo_name> <environment_name> <s3_bucket> <aws_iam_role>"
  echo "i.e. $0 qld-gov-au qgds-core DEV \"s3bucket/folder\" aws_iam_role"
  exit 1
fi

# Assign arguments to variables
REPO_OWNER="$1"
REPO_NAME="$2"
ENV_NAME="$3"
S3BUCKET="$4"
AWS_IAM_ROLE="$5"

# Function to check if environment exists
check_environment() {
  gh api repos/${REPO_OWNER}/${REPO_NAME}/environments/${ENV_NAME} --jq '.name' > /dev/null 2>&1
}

# Function to create environment
create_environment() {
  gh api repos/${REPO_OWNER}/${REPO_NAME}/environments/${ENV_NAME} --method PUT
}

# Function to set secret
set_secret() {
  local secret_name=$1
  local secret_value=$2
  gh secret set ${secret_name} --body "${secret_value}" --env ${ENV_NAME} --repo ${REPO_OWNER}/${REPO_NAME}
}

# Check if environment exists
if check_environment; then
  echo "Environment ${ENV_NAME} already exists in repository ${REPO_OWNER}/${REPO_NAME}."
else
  echo "Creating environment ${ENV_NAME} in repository ${REPO_OWNER}/${REPO_NAME}."
  create_environment
fi

# Set secrets
echo "Setting secrets for environment ${ENV_NAME}."
set_secret "S3BUCKET" "${S3BUCKET}"
set_secret "AWS_IAM_ROLE" "${AWS_IAM_ROLE}"

echo "Environment ${ENV_NAME} and secrets have been set successfully."
