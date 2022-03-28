import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('getBooleanValue',  () => {

    const defaultGetBooleanValue = `getBooleanValue(callerTestData, "LGd042RGb27")`;
    const invalidGetBooleanValueV3 = `getBooleanValue(callerTestData)`;
    const invalidGetBooleanValueGreaterV3 = `getBooleanValue(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetBooleanValue, 'getBooleanValue("LJKaSADfHH127gd")');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])('positive: getBooleanValue - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
    ])('positive: getBooleanValue - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry],
    ])('positive: getBooleanValue - getting a boolean from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidGetBooleanValueV3, data.getRandomAddress(), `'getBooleanValue'(Address)`],
        [data.STDLIB_VERSION_3, invalidGetBooleanValueV3, data.getRandomAlias(), `'getBooleanValue'(Alias)`],
        [data.STDLIB_VERSION_4, invalidGetBooleanValueGreaterV3, data.getRandomAddress(), `'getBooleanValue'(Address)`],
        [data.STDLIB_VERSION_5, invalidGetBooleanValueGreaterV3, data.getRandomAlias(), `'getBooleanValue'(Alias)`],
    ])("negative: Can't find a function overload 'getBooleanValue'(Address) or 'getBooleanValue'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBooleanValue'(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnDataWithoutMatcher(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBooleanValue'(String)`);
    });
});
