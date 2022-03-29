import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getBoolean',  () => {

    const defaultGetBooleanKey = `getBoolean(callerTestData, "key")`;
    const defaultGetBooleanIndex = `getBoolean(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetBooleanKey, null, 'Boolean');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry,data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests],
    ])('positive: getBoolean(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result,data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, data.integerEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, data.booleanEntryForTests],
    ])('positive: getBoolean(List[], Int) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase
        (version, caseForVersions, callerTestData, defaultGetBooleanIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, random.getRandomAddress()],
    ])("negative: invalid data for getBoolean(List[], Int) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetBooleanIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getBoolean'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBooleanEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBooleanEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getBoolean(List[], key) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetBooleanKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getBoolean'`);
    });
});
