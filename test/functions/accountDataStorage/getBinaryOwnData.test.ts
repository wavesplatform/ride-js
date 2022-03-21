import * as data from "../../testData/data";

const compiler = require('../../../src');

describe('getBinaryOwnData',  () => {

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3Result],
    ])('getting a binary from your own data', (version, scriptResult) => {
        let contract = generateContract(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAddress()],
    ])("Can't find a function overload 'getBinary'(String)", (version, scriptResult) => {
        let contract = generateContract(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBinary'(String)`);
    });

    test.each([
        [data.STDLIB_INVALID_VERSION, data.RideV3Result],
        [data.STDLIB_INVALID_VERSION, data.GreaterV3Result]
    ])("invalid lib version", (version, scriptResult) => {
        let contract = generateContract(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toEqual(`Illegal directive value ${data.STDLIB_INVALID_VERSION} for key STDLIB_VERSION`);
    })

    const generateContract = (libVersion, caseForVersions) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let binValueOrUnit = getBinary("Ȣ瞱蛉㦎᠖꭛믳癚曉续")
            let binValue = match(binValueOrUnit) {
              case b:ByteVector => b
              case _ => throw("not binary")
            }
            ${caseForVersions}
        }`;
    }
});