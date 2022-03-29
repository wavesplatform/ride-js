import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getStringValue',  () => {

    const defaultGetStringValueKey = `getStringValue(callerTestData, "key")`;
    const defaultGetStringValueIndex = `getStringValue(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetStringValueKey, null, 'String');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry,data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.booleanEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.integerEntryForTests],
    ])('positive: getStringValue(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result,data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.booleanEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.integerEntryForTests],
    ])('positive: getStringValue(List[], Int) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase
        (version, caseForVersions, callerTestData, defaultGetStringValueIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, random.getRandomAddress()],
    ])("negative: invalid data for getStringValue(List[], Int) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetStringValueIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getStringValue'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getStringValue(List[], key) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetStringValueKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getStringValue'`);
    });
});
