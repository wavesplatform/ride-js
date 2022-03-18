const compiler = require('../../../src');
const scalaJsCompiler = require('../../../src/lang-opt.js');


describe('getBinary',  () => {

    const RideV3Result = `
        WriteSet([
            DataEntry("binaryValue", binValue)
        ])`;
    const GreaterV3Result =
        `[
            BinaryEntry("bin", binValue)
        ]`;

    const testAddress = "Address(base58'')";
    const testAlias = 'Alias("merry")';

    test.each([
        [3, RideV3Result, testAddress],
        [4, GreaterV3Result, testAddress],
        [5, GreaterV3Result, testAddress],
    ])('get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    test.each([
        [3, RideV3Result, testAlias],
        [4, GreaterV3Result, testAlias],
        [5, GreaterV3Result, testAlias],
    ])('get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    let generateContract = (libVersion, caseForVersions, testData) => {
            return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let callerAddressOrAlias = ${testData}
            let binValueOrUnit = getBinary(callerAddressOrAlias, "Ȣ瞱蛉㦎᠖꭛믳癚曉续")
            let binValue = match(binValueOrUnit) {
              case b:ByteVector => b
              case _ => throw("not binary")
            }
            ${caseForVersions}
        }`;
    }
});