import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('isDataStorageUntouched',  () => {

    const defaultIsDataStorageUntouched = `isDataStorageUntouched(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultIsDataStorageUntouched, 'isDataStorageUntouched(callerTestData)', 'Int');

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, random.getRandomAlias()],
    ])('positive: isDataStorageUntouched compiled', (version, scriptResult, address) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, address);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAlias(), "isDataStorageUntouched'(Alias)"],
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomAddress(), "isDataStorageUntouched'(Address)"],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, random.getRandomAlias(), "isDataStorageUntouched'(Alias)"],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, random.getRandomAddress(), "isDataStorageUntouched'(Address)"],
    ])('negative: missing isDataStorageUntouched() for Ride V3 & V4', (version, scriptResult, alias, funcError) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, alias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Compilation failed: [Can't find a function '${funcError}`);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, ''],
    ])("negative: invalid address or alias", (version, scriptResult, addressOrAlias) => {
        let contract = precondition.generateContractWithoutMatcher(version, scriptResult, addressOrAlias);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });
});