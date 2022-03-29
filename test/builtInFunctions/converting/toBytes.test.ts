import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('toBytes',  () => {

    const stringData = `"string to test"`
    const defaultToBytesFunction = `toBytes(callerTestData)`;
    const invalidToBytes = 'toBytes()';

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultToBytesFunction, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_3, true],
        [data.STDLIB_VERSION_3, stringData],
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, true],
        [data.STDLIB_VERSION_4, stringData],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, true],
        [data.STDLIB_VERSION_5, stringData],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: toBytes func compiles for ride v%i at correct data structures', (version, testData) => {
        const contract = precondition.generateOnlyMatcherContract(version, testData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: toBytes func compiles for ride v%i at bigInt', (version, bigInt) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${bigInt})`);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray()],
    ])('negative: invalid data in toBytes for ride v%i', (version, invalidData) => {
        const contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toBytes'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, true],
        [data.STDLIB_VERSION_4, stringData],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid function for v%i', (version, int) => {
        const contract = precondition.generateOnlyMatcherContract(version, int, invalidToBytes);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toBytes'()`);
    });
});
