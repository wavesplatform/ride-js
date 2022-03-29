import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getString',  () => {

    const defaultGetStringKey = `getString(callerTestData, "key")`;
    const defaultGetStringIndex = `getString(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetStringKey, null, 'String');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry,data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, data.booleanEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, data.integerEntryForTests],
    ])('positive: getString(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
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
    ])('positive: getString(List[], Int) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase
        (version, caseForVersions, callerTestData, defaultGetStringIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, random.getRandomAddress()],
    ])("negative: invalid data for getString(List[], Int) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetStringIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getString'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultStringEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultStringEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getString(List[], key) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetStringKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getString'`);
    });
});
