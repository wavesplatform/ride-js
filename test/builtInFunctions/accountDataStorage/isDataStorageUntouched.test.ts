import * as data from "../../testData/data";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('isDataStorageUntouched',  () => {

    const defaultIsDataStorageUntouched = `isDataStorageUntouched(callerAddressOrAlias)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultIsDataStorageUntouched, 'isDataStorageUntouched(callerAddressOrAlias)', 'Int');

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.getRandomAlias()],
    ])('positive: isDataStorageUntouched compiled', (version, scriptResult, address) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAlias(), "isDataStorageUntouched'(Alias)"],
        [data.STDLIB_VERSION_3, data.RideV3Result, data.getRandomAddress(), "isDataStorageUntouched'(Address)"],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAlias(), "isDataStorageUntouched'(Alias)"],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.getRandomAddress(), "isDataStorageUntouched'(Address)"],
    ])('negative: missing isDataStorageUntouched() for Ride V3 & V4', (version, scriptResult, alias, funcError) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function '${funcError}`);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });
});