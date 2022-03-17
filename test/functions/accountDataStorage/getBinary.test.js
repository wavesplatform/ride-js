const compiler = require('../../../src');
const scalaJsCompiler = require('../../../src/lang-opt.js');
const {binaryValue} = require("../../testData/binary");
const {expect} = require("@jest/globals");

describe('getBinary', function () {

    const caseForV3 = `
        WriteSet([
            DataEntry("binaryValue", binValue)
        ])`;
    const caseForLargestVersions =
        `[
            BinaryEntry("bin", binValue)
        ]`;

    it.each([
        [3, caseForV3],
        [4, caseForLargestVersions],
        [5, caseForLargestVersions],
        [44, caseForLargestVersions],
    ])('get byte array by Address', (version, cases) => {
        const tx = () => data({
            version: version,
            cases: cases,
        });
        let contract = generateContract(version, cases);
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
        }
`;
    }
});