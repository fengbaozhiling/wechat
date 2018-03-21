#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}

rm -rf ./_dist

gulp copy && gulp copy2
tsc

./node_modules/.bin/labrador build  --src-dir=./_dist