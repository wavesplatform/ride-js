import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('getInteger',  () => {

    const defaultGetInteger = `getInteger(callerTestData, "LtKaSADfaH127gd")`;
    const invalidGetIntegerV3 = `getInteger(callerTestData)`;
    const invalidGetIntegerGreaterV3 = `getInteger(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetInteger, 'getInteger("LJKaSADfHH127gd")', 'Int');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
    ])('positive: getInteger - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, data.getRandomAlias()],
    ])('positive: getInteger - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry],
    ])('positive: getInteger - getting a boolean from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidGetIntegerV3, data.getRandomAddress(), `'getInteger'(Address)`],
        [data.STDLIB_VERSION_3, invalidGetIntegerV3, data.getRandomAlias(), `'getInteger'(Alias)`],
        [data.STDLIB_VERSION_4, invalidGetIntegerGreaterV3, data.getRandomAddress(), `'getInteger'(Address)`],
        [data.STDLIB_VERSION_5, invalidGetIntegerGreaterV3, data.getRandomAlias(), `'getInteger'(Alias)`],
    ])("negative: Can't find a function overload 'getInteger'(Address) or 'getInteger'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getInteger'(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getInteger'(String)`);
    });
});
