#!/bin/bash

# Usage: ./cdnDeploy.sh repo_root=<REPO_ROOT> s3bucket=<S3BUCKET> version=<VERSION> updateLatest=<TRUE|FALSE>

# Parse command line arguments
UPDATE_LATEST=false  # Default updateLatest value
DRY_RUN=false #default

# Parse additional arguments (version and updateLatest)
for arg in "${@:1}"; do
    case "$arg" in
        dry_run=*)
            DRY_RUN="${arg#*=}"
            ;;
        repo_root=*)
            REPO_ROOT="${arg#*=}"
            ;;
        s3bucket=*)
            S3BUCKET="${arg#*=}"
            ;;
        version=*)
            VERSION="${arg#*=}"
            ;;
        updateLatest=*)
            UPDATE_LATEST="${arg#*=}"
            ;;
        purgeVersion=*)
            PURGE_VERSION="${arg#*=}"
            ;;
        purgeOnly=*)
            PURGE_ONLY="${arg#*=}"
            ;;
        *)
            echo "Ignoring unknown argument: $arg"
            ;;
    esac
done

aws_dry_run=""
if [[ "$DRY_RUN" == "true" ]]; then
  echo "Dry Run enabled";
  aws_dry_run=" --dryrun "
fi

# Check if VERSION is "-1"
if [[ "$VERSION" == "-1" ]]; then
    echo "Error: Version not set. Exiting script."
    exit 1
fi

### PURGE COMPONENT
if [[ "$PURGE_VERSION" != "" ]]; then
  echo "PURGING version $PURGE_VERSION"
  IFS='.' read -r PURGE_MAJOR PURGE_MINOR PURGE_PATCH <<< "$PURGE_VERSION"
  echo "Major: $PURGE_MAJOR"
  echo "Minor: $PURGE_MINOR"
  echo "Patch: $PURGE_PATCH"
  if [[ -z "$PURGE_MAJOR" || -z "$PURGE_MINOR" || -z "$PURGE_PATCH" ]]; then
    echo "Won't purge, invalid version provided" >> $GITHUB_STEP_SUMMARY
    exit 1;
  fi

  echo "Purging ${PURGE_MAJOR}/${PURGE_VERSION} from S3 only" >> $GITHUB_STEP_SUMMARY
  if [[ "$UPDATE_LATEST" != "true" || "$PURGE_ONLY" == "true" ]]; then
  echo "If you wish to replace ${PURGE_MAJOR}/${PURGE_MAJOR}.x.x-latest, ${PURGE_MAJOR}/${PURGE_MAJOR}.${PURGE_MINOR}.x-latest then set UPDATE_LATEST to true" >> $GITHUB_STEP_SUMMARY
  fi


  aws s3 rm $aws_dry_run --recursive s3://${S3BUCKET}/${PURGE_MAJOR}/${PURGE_VERSION}


  if [[ "$PURGE_ONLY" == "true" ]]; then
    echo "Purge $aws_dry_run $PURGE_VERSION complete, requested to not deploy new version" >> $GITHUB_STEP_SUMMARY
    exit 0
  fi

fi


### DEPLOY COMPONENT

# Convert UPDATE_LATEST to lowercase for case-insensitive comparison
UPDATE_LATEST=$(echo "$UPDATE_LATEST" | tr '[:upper:]' '[:lower:]')

IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"
echo "Major: $MAJOR"
echo "Minor: $MINOR"
echo "Patch: $PATCH"

echo "Environment Name: $ENVIRONMENT_NAME"
echo "S3 Bucket: $S3BUCKET"
echo "Version: $VERSION"
echo "Major Version: $MAJOR"
echo "Update Latest: $UPDATE_LATEST"

# Create a working directory; the workspace may be filled with other important
# files.
#
WORK_DIR="${INPUT_WORKDIR:-$(mktemp -d "${HOME}/gitrepo.XXXXXX")}"
[ -z "${WORK_DIR}" ] && echo >&2 "::error::Failed to create temporary working directory" && exit 1
git config --global --add safe.directory "${WORK_DIR}" || exit 1
cd "${WORK_DIR}" || exit 1



# Create the target directory (if necessary) and copy files from source.
#
TARGET_PATH="${WORK_DIR}/${TARGET_FOLDER}"
echo "Populating ${TARGET_PATH}"

mkdir -p "${TARGET_PATH}" || exit 1

if [[ "$UPDATE_LATEST" == "true" ]]; then
  #major
  MAJOR_LATEST="${MAJOR}/${MAJOR}.x.x-latest"
  mkdir -p "${TARGET_PATH}/${MAJOR_LATEST}" || exit 1
  rsync -a --quiet --delete --exclude ".git" --exclude ".github" "${REPO_ROOT}/" "${TARGET_PATH}/${MAJOR_LATEST}" || exit 1
  aws s3 sync $aws_dry_run --delete "${TARGET_PATH}/${MAJOR_LATEST}" s3://$S3BUCKET/${MAJOR_LATEST}
  #minor
  MINOR_LATEST="${MAJOR}/${MAJOR}.${MINOR}.x-latest"
  mkdir -p "${TARGET_PATH}/${MINOR_LATEST}" || exit 1
  rsync -a --quiet --delete --exclude ".git" --exclude ".github" "${REPO_ROOT}/" "${TARGET_PATH}/${MINOR_LATEST}" || exit 1
  aws s3 sync $aws_dry_run --delete "${TARGET_PATH}/${MINOR_LATEST}"  s3://$S3BUCKET/${MINOR_LATEST}
fi

#tag
mkdir -p "${TARGET_PATH}/${MAJOR}/${VERSION}"
rsync -a --quiet --delete --exclude ".git" --exclude ".github" "${REPO_ROOT}/" "${TARGET_PATH}/${MAJOR}/${VERSION}" || exit 1
aws s3 sync $aws_dry_run --delete "${TARGET_PATH}/${MAJOR}/${VERSION}" s3://$S3BUCKET/${MAJOR}/${VERSION}


echo "Deployment $VERSION completed" >> $GITHUB_STEP_SUMMARY