import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('getIntegerValue',  () => {

    const defaultGetIntegerValue = `getIntegerValue(callerTestData, "LtKaSADfaH127gd")`;
    const invalidGetIntegerValueV3 = `getIntegerValue(callerTestData)`;
    const invalidGetIntegerValueGreaterV3 = `getIntegerValue(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetIntegerValue, 'getIntegerValue("LJKaSADfHH127gd")');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, random.getRandomAddress()],
    ])('positive: getIntegerValue - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, random.getRandomAlias()],
    ])('positive: getIntegerValue - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry],
    ])('positive: getIntegerValue - getting a boolean from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidGetIntegerValueV3, random.getRandomAddress(), `'getIntegerValue'(Address)`],
        [data.STDLIB_VERSION_3, invalidGetIntegerValueV3, random.getRandomAlias(), `'getIntegerValue'(Alias)`],
        [data.STDLIB_VERSION_4, invalidGetIntegerValueGreaterV3, random.getRandomAddress(), `'getIntegerValue'(Address)`],
        [data.STDLIB_VERSION_5, invalidGetIntegerValueGreaterV3, random.getRandomAlias(), `'getIntegerValue'(Alias)`],
    ])("negative: Can't find a function overload 'getIntegerValue'(Address) or 'getIntegerValue'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, random.getRandomAddress()],
    ])("negative: Can't find a function overload 'getIntegerValue'(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getIntegerValue'(String)`);
    });
});
