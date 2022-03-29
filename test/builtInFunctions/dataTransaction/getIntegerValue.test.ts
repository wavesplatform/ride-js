import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getIntegerValue',  () => {

    const defaultGetIntegerValueKey = `getIntegerValue(callerTestData, "key")`;
    const defaultGetIntegerValueIndex = `getIntegerValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetIntegerValueKey, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry,data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests],
    ])('positive: getIntegerValue(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests],
    ])('positive: getIntegerValue(List[], Int) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase
        (version, caseForVersions, callerTestData, defaultGetIntegerValueIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomAddress()],
    ])("negative: invalid data for getIntegerValue(List[], Int) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetIntegerValueIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getIntegerValue'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getIntegerValue(List[], key) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetIntegerValueKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getIntegerValue'`);
    });
});
