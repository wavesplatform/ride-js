import * as data from "../../testData/data";
import {GenerateContractAccountDataStorage} from "./GenerateContractAccountDataStorage";

const compiler = require('../../../src');

describe('getStringValue',  () => {

    const precondition = new GenerateContractAccountDataStorage
    (data.defaultGetStringValue, 'getStringValue("LJKaSADdsH127gd")');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.getRandomAddress()],
    ])('positive: getStringValue - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.getRandomAlias()],
    ])('positive: getStringValue - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry],
    ])('positive: getStringValue - getting a boolean from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.invalidGetStringValueV3, data.getRandomAddress(), `'getStringValue'(Address)`],
        [data.STDLIB_VERSION_3, data.invalidGetStringValueV3, data.getRandomAlias(), `'getStringValue'(Alias)`],
        [data.STDLIB_VERSION_4, data.invalidGetStringValueGreaterV3, data.getRandomAddress(), `'getStringValue'(Address)`],
        [data.STDLIB_VERSION_5, data.invalidGetStringValueGreaterV3, data.getRandomAlias(), `'getStringValue'(Alias)`],
    ])("negative: Can't find a function overload 'getStringValue'(Address) or 'getStringValue'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getStringValue(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getStringValue'(String)`);
    });
});
