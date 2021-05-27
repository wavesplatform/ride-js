#!/bin/bash
cd ../Waves
sbt langJS/fullOptJS
mv lang/js/target/lang-opt.js ../ride-js/src
