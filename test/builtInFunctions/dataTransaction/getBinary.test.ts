import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getBinary',  () => {

    const defaultGetBinaryKey = `getBinary(callerTestData, "key")`;
    const defaultGetBinaryIndex = `getBinary(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetBinaryKey, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests],
    ])('positive: getBinary(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, data.dataEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.binaryEntryForTests],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, data.integerEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.stringEntryForTests],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, data.booleanEntryForTests],
    ])('positive: getBinary(List[], Int) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase
        (version, caseForVersions, callerTestData, defaultGetBinaryIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomAddress()],
    ])("negative: invalid data for getBinary(List[], Int) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetBinaryIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getBinary'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getBinary(List[], key) ride v%i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetBinaryKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getBinary'`);
    });
});
