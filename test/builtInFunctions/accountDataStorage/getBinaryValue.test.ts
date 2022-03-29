import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('getBinaryValue',  () => {

    const defaultGetBinaryValue = `getBinaryValue(callerTestData, "LJKaSADfHH782gd")`
    const invalidGetBinaryValueV3 = `getBinaryValue(callerTestData)`;
    const invalidGetBinaryValueGreaterV3 = `getBinaryValue(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetBinaryValue, 'getBinaryValue("LJKaSADfHH127gd")');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
    ])('positive: getBinaryValue - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAlias()],
    ])('positive: getBinaryValue - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry],
    ])('positive: getBinaryValue - getting a binary from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidGetBinaryValueV3, random.getRandomAddress(), `'getBinaryValue'(Address)`],
        [data.STDLIB_VERSION_3, invalidGetBinaryValueV3, random.getRandomAlias(), `'getBinaryValue'(Alias)`],
        [data.STDLIB_VERSION_4, invalidGetBinaryValueGreaterV3, random.getRandomAddress(), `'getBinaryValue'(Address)`],
        [data.STDLIB_VERSION_5, invalidGetBinaryValueGreaterV3, random.getRandomAlias(), `'getBinaryValue'(Alias)`],
    ])("negative: Can't find a function overload 'getBinaryValue'(Address) or 'getBinaryValue'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBinaryValue'(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBinaryValue'(String)`);
    });
});
