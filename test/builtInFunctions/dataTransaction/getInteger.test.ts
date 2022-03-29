import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getInteger',  () => {

    const defaultGetIntegerKey = `getInteger(callerTestData, "key")`;
    const defaultGetIntegerIndex = `getInteger(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetIntegerKey, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry,data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests],
    ])('positive: getInteger(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result,data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, data.integerEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, data.booleanEntryForTests],
    ])('positive: getInteger(List[], Int) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase
        (version, caseForVersions, callerTestData, defaultGetIntegerIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomAddress()],
    ])("negative: invalid data for getInteger(List[], Int) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetIntegerIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getInteger'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultIntegerEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getInteger(List[], key) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetIntegerKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getInteger'`);
    });
});
