#!/bin/sh
ISERROR=0

rm -rf node_modules && \
npm install && \
npm run setup && \
echo "OK!"
