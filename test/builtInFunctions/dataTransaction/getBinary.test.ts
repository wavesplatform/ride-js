import * as data from "../../testData/data";
import * as random from "../../testData/random";
import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('dataTransaction - getBinary',  () => {

    // getBinary(data: List[BinaryEntry|BooleanEntry|IntegerEntry|StringEntry], key: String): ByteVector|Unit
    const dataEntry = random.entryListWithRandomData('DataEntry', random.getRandomByteVector());
    const binaryEntry = random.entryListWithRandomData('BinaryEntry', random.getRandomByteVector());
    const integerEntry = random.entryListWithRandomData('IntegerEntry', random.getRandomInt());
    const stringEntry = random.entryListWithRandomData('StringEntry', `"string"`);
    const booleanEntry = random.entryListWithRandomData('BooleanEntry', false);

    const defaultGetBinaryKey = `getBinary(callerTestData, "key")`;
    const defaultGetBinaryIndex = `getBinary(callerTestData, ${random.getRandomInt()})`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultGetBinaryKey, 'getBinary("LJKaSADfHH127gd")', 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, dataEntry],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, binaryEntry],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, integerEntry],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, stringEntry],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, booleanEntry],
    ])('positive: getBinary(List[], key) compiled for ride v%i', (version, caseForVersions, callerTestData) => {
        const contract = precondition.generateContractFromMatchingAndCase(version, caseForVersions, callerTestData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, dataEntry],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, binaryEntry],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, integerEntry],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, stringEntry],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, booleanEntry],
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
    ])("negative: invalid data for getBinary(List[], Int) ride v$i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetBinaryIndex);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getBinary'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, data.RideV3Result, random.getRandomInt()],
        [data.STDLIB_VERSION_4, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, data.GreaterV3ResultBinaryEntry, random.getRandomIssuesArray()],
    ])("negative: invalid data for getBinary(List[], key) ride v$i", (version, scriptResult, invalidData) => {
        let contract = precondition.generateContractFromMatchingAndCase
        (version, scriptResult, invalidData, defaultGetBinaryKey);

        const compiled = compiler.compile(contract);
        expect(compiled.error).toContain(`Can't find a function overload 'getBinary'`);
    });
});
