#!/bin/bash
# cd /opt/src
npm i
npm version $VERSION
npm run build
npm run publish
