# Ride-js
Javascript wrapper for [ride language](https://docs.wavesplatform.com/en/smart-contracts/ride-language/ride-language.html) compiler

This repository also contains version of the compiler build with [scala-js](https://www.scala-js.org/)
### To update compiler version in this wrapper:
* Clone [waves](https://github.com/wavesplatform/waves) project
* Checkout to branch of your choice to build new compiler version
* Build js compiler using sbt task 
```sbt
sbt langJS/fullOptJS
```
* From `waves` project copy ```./lang/js/target/lang-opt.js``` to ```./src```  of `ride-js`

### Tasks
* `npm run build` builds minified version that can be included as script tag. Add RideJS variable to global scope