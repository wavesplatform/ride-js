import * as data from "../../testData/data";
import {GenerateContractAccountDataStorage} from "./GenerateContractAccountDataStorage";

const compiler = require('../../../src');

describe('getBoolean',  () => {

    const defaultGetBoolean = `getBoolean(callerAddressOrAlias, "LtKaSADfaH127gd")`
    const invalidGetBooleanV3 = `getBoolean(callerAddressOrAlias)`;
    const invalidGetBooleanGreaterV3 = `getBoolean(callerAddressOrAlias)`;

    const precondition = new GenerateContractAccountDataStorage
    (defaultGetBoolean, 'getBoolean("LJKaSADfHH127gd")', 'Boolean');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])('positive: getBoolean - get byte array by address', (version, scriptResult, address) => {
        let contract = precondition.generateContract(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
    ])('positive: getBoolean - get byte array by alias', (version, scriptResult, alias) => {
        let contract = precondition.generateContract(version, scriptResult, alias);
        console.log(contract)
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry],
    ])('positive: getBoolean - getting a boolean from your own data', (version, scriptResult) => {
        let contract = precondition.generateContractOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, ''],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, ''],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContract(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidGetBooleanV3, data.getRandomAddress(), `'getBoolean'(Address)`],
        [data.STDLIB_VERSION_3, invalidGetBooleanV3, data.getRandomAlias(), `'getBoolean'(Alias)`],
        [data.STDLIB_VERSION_4, invalidGetBooleanGreaterV3, data.getRandomAddress(), `'getBoolean'(Address)`],
        [data.STDLIB_VERSION_5, invalidGetBooleanGreaterV3, data.getRandomAlias(), `'getBoolean'(Alias)`],
    ])("negative: Can't find a function overload 'getBoolean'(Address) or 'getBoolean'(Alias)",
        (version, scriptResult, addressOrAlias, funcError) => {
            let contract = precondition.generateContract(version, scriptResult, addressOrAlias);
            const compiled = compiler.compile(contract);
            expect(compiled.error)
                .toContain(`Compilation failed: [Can't find a function overload ${funcError}`);
        });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
    ])("negative: Can't find a function overload 'getBoolean'(String)", (version, scriptResult) => {
        let contract = precondition.generateContractOwnData(version, scriptResult);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function overload 'getBoolean'(String)`);
    });
});
