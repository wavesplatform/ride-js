import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('getString',  () => {

    const defaultGetString = `getString(callerAddressOrAlias, "LtKaSADfaH127gd")`;
    const invalidGetStringV3 = `getString(callerAddressOrAlias)`;
    const invalidGetStringGreaterV3 = `getString(callerAddressOrAlias)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetString, 'getString("LJKaSADdsH127gd")', 'String');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.getRandomAddress()],
    ])('positive: getString - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.getRandomAlias()],
    ])('positive: getString - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry],
    ])('positive: getString - getting a boolean from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidGetStringV3, data.getRandomAddress(), `'getString'(Address)`],
        [data.STDLIB_VERSION_3, invalidGetStringV3, data.getRandomAlias(), `'getString'(Alias)`],
        [data.STDLIB_VERSION_4, invalidGetStringGreaterV3, data.getRandomAddress(), `'getString'(Address)`],
        [data.STDLIB_VERSION_5, invalidGetStringGreaterV3, data.getRandomAlias(), `'getString'(Alias)`],
    ])("negative: Can't find a function overload 'getString'(Address) or 'getString'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContractFromMatchingAndCase(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getString(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getString'(String)`);
    });
});
