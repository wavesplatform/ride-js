#!/bin/bash
cd /opt/src
npm i
npm --no-git-tag-version version $VERSION
npm run build
npm run publish
