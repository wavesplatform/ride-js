const compiler = require('../../../src');
const scalaJsCompiler = require('../../../src/lang-opt.js');
const {binaryValue} = require("../../testData/binary");


describe('getBinary',  () => {

    const RideV3Result = `
        WriteSet([
            DataEntry("binaryValue", binValue)
        ])`;
    const GreaterV3Result =
        `[
            BinaryEntry("bin", binValue)
        ]`;

    test.each([
        [3, RideV3Result],
        [4, GreaterV3Result],
        [5, GreaterV3Result],
        [44, GreaterV3Result],
    ])('get byte array by Address', (version, scriptResult) => {

        let contract = generateContract(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    let generateContract = (libVersion, caseForVersions) => {
            return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let callerAddress = Address(base58'')
            let binValueOrUnit = getBinary(callerAddress, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")
            let binValue = match(binValueOrUnit) {
              case b:ByteVector => b
              case _ => throw("not binary")
            }
            ${caseForVersions}
        }`;
    }
});