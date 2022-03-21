import * as data from "../../testData/data";

const compiler = require('../../../src');
const scalaJsCompiler = require('../../../src/lang-opt.js');

describe('getBinary',  () => {

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, data.getRandomAddress()],
    ])('get byte array by address', (version, scriptResult, address) => {
        let contract = generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, data.getRandomAlias()],
    ])('get byte array by alias', (version, scriptResult, alias) => {
        let contract = generateContract(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    })

    test.each([
        [data.STDLIB_INVALID_VERSION, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_INVALID_VERSION, data.GreaterV3Result, data.getRandomAlias()]
    ])("invalid lib version", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toEqual(`Illegal directive value ${data.STDLIB_INVALID_VERSION} for key STDLIB_VERSION`);
    })

    test.each([
        [data.STDLIB_VERSION_3, data.InvalidDataEntryV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_3, data.InvalidDataEntryV3Result, data.getRandomAlias()],
    ])("invalid ride v3 script", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Function 'DataEntry' requires 2 arguments, but 1 are provided in`);
    })

    test.each([
        [data.STDLIB_VERSION_4, data.InvalidBinaryEntryGreaterV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.InvalidBinaryEntryGreaterV3Result, data.getRandomAlias()],
    ])("invalid greater v3 script", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Function 'BinaryEntry' requires 2 arguments, but 1 are provided in`);
    })

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3Result, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3Result, ''],
    ])("invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    })

    test.each([
        [data.STDLIB_VERSION_3, data.InvalidGetBinaryV3Result, data.getRandomAddress(), `'getBinary'(Address)`],
        [data.STDLIB_VERSION_3, data.InvalidGetBinaryV3Result, data.getRandomAlias(), `'getBinary'(Alias)`],
        [data.STDLIB_VERSION_4, data.InvalidGetBinaryGreaterV3Result, data.getRandomAddress(), `'getBinary'(Address)`],
        [data.STDLIB_VERSION_5, data.InvalidGetBinaryGreaterV3Result, data.getRandomAlias(), `'getBinary'(Alias)`],
    ])("Can't find a function overload 'getBinary'(Address) or 'getBinary'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
        let contract = generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
    })

    const generateContract = (libVersion, caseForVersions, testData) => {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func binary() = {
            let callerAddressOrAlias = ${testData}
            ${caseForVersions}
        }`;
    }
});