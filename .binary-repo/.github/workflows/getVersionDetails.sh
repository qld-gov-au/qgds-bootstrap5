#!/bin/bash

REF="${GITHUB_BASE_REF:-${GITHUB_REF}}"
TAG_VALUE=${GITHUB_REF/refs\/tags\//}

#If on a tag, use the tagged version as source of truth.
if [[ "$GITHUB_REF" == "${GITHUB_REF/refs\/tags\//}"  ]]; then
  echo "Is not a tag"
  version=v$(node -pe 'require("./package.json").version')
  echo "version=${version}" >> $GITHUB_ENV
else
#Second best case := package version.
  version=${TAG_VALUE}
  echo "version=${version}" >> $GITHUB_ENV
fi

IFS='.' read -r MAJOR MINOR PATCH <<< "$version"
echo "url=https://$1.qgov.net.au/qgds-bootstrap5/${MAJOR}/${version}" >> $GITHUB_OUTPUT