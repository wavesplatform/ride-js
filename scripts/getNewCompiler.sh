#!/bin/bash
cd ../Waves
sbt langJS/fullOptJS
sbt replJS/fullOptJS
mv lang/js/target/lang-opt.js ../ride-js/src
mv repl/js/target/repl-opt.js ../ride-js/src
