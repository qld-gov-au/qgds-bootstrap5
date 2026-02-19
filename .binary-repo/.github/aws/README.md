## AWS Environment connectivity for cdn deployment.

This iam config is required to allow github Actions to deploy to
aws for an environment release.


```shell
deploy_stack() {
  local ENV=$1
  local STACK_NAME="QGDS-Bootstrap5-$ENV"
  local S3_BUCKET_NAME="/config/QGDS-Bootstrap5/$ENV/S3BucketName"
  local S3_BUCKET_PATH="/config/QGDS-Bootstrap5/$ENV/S3BucketPath"

  aws cloudformation deploy \
    --template-file iam.cfn.yml \
    --stack-name $STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
      Branch1=main \
      Branch2=develop \
      Environment=$ENV \
      GitHubOIDCProviderARN=/config/GitHubOIDCProviderARN \
      GitHubOrg=qld-gov-au \
      RepoName=qgds-Bootstrap5-release \
      S3BucketName=$S3_BUCKET_NAME \
      S3BucketPath=$S3_BUCKET_PATH
}

# Example usage:
deploy_stack DEV
deploy_stack TEST
deploy_stack STAGING
deploy_stack PROD
deploy_stack BETA
```


## GitHub Environments
 1. Setup one or more enviroments DEV|TEST|etc
 2. Add secrets: AWS_IAM_ROLE and S3BUCKET (i.e. s3://myBucket/folderPrefix) based on what is set in your aws param store configuration
 3. Add branch/tag restrictions
 4. deploy via github action script cdnAWSDeployment.yml

### Script to create environments

Prerequisites
Ensure you have the GitHub CLI (gh) installed.
https://cli.github.com/
i.e. for mac  ``brew install gh``

Authenticate gh to your GitHub account by running 
``gh auth login`` and following the prompts.

```shell
./setup_github_environment.sh qld-gov-au qgds-bootstrap5-release DEV "s3://your-s3-bucket-nam/folder" arn:aws:iam::00011122211:role/cfnCreatedRoleHere

```