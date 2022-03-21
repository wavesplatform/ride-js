import * as data from "../../testData/data";

const compiler = require('../../../src');
const scalaJsCompiler = require('../../../src/lang-opt.js');

describe('getBinary',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, data.getRandomAddress()],
    ])('get byte array by address', (version, scriptResult, address) => {
        console.log(address)
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, data.getRandomAlias()],
    ])('get byte array by alias', (version, scriptResult, alias) => {
        console.log(alias)
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    test.each([
        [data.STDLIB_INVALID_VERSION, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_INVALID_VERSION, data.GreaterV3Result, data.getRandomAlias()]
    ])("invalid lib version", (version, scriptResult, alias) => {
        console.log(alias)
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toEqual(`Illegal directive value ${data.STDLIB_INVALID_VERSION} for key STDLIB_VERSION`);
    })

    test.each([
        [data.STDLIB_VERSION_3, data.InvalidV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_3, data.InvalidV3Result, data.getRandomAlias()],
    ])("invalid ride v3 script", (version, scriptResult, alias) => {
        console.log(alias)
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Function 'DataEntry' requires 2 arguments, but 1 are provided in`);
    })

    test.each([
        [data.STDLIB_VERSION_4, data.InvalidGreaterV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.InvalidGreaterV3Result, data.getRandomAlias()],
    ])("invalid greater v3 script", (version, scriptResult, alias) => {
        console.log(alias)
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Function 'BinaryEntry' requires 2 arguments, but 1 are provided in`);
    })

    const generateContract = (libVersion, caseForVersions, testData) => {
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