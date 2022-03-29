import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('toUtf8String',  () => {

    const defaultToUtf8StringFunction = `toUtf8String(callerTestData)`;
    const invalidToUtf8String = 'toUtf8String()';

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultToUtf8StringFunction, null, 'String');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('positive: toUtf8String func compiles for ride v%i at ByteVector', (version, testData) => {
        let contract = precondition.generateOnlyMatcherContract(version, testData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray()],
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, true],
        [data.STDLIB_VERSION_5, `"string"`],
    ])('negative: invalid data in toUtf8String for ride v%i', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: ByteVector, actual:`);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('negative: invalid function for v%i', (version, testData) => {
        let contract = precondition.generateOnlyMatcherContract(version, testData, invalidToUtf8String);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'toUtf8String' requires 1 arguments, but 0 are provided`);
    });
});
