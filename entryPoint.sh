#!/bin/bash
set -xe
: "${REST_API_URL_REPLACE?Need an api url}"

sed -i "s/REST_API_URL_REPLACE/$REST_API_URL_REPLACE/g" /usr/share/nginx/html/main*bundle.js

exec "$@"
