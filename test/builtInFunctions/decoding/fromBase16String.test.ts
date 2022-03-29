import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('fromBase16String',  () => {

    const defaultFromBase16String = `fromBase16String(callerTestData)`;
    const invalidFromBase16String = `fromBase16String()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultFromBase16String, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomStringArray()],
        [data.STDLIB_VERSION_4, random.getRandomStringArray()],
        [data.STDLIB_VERSION_5, random.getRandomStringArray()],
    ])('positive: fromBase16String func compiles', (version, testString) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, 1],
    ])('negative: invalid byteVector in fromBase16String', (version, invalidData) => {
        const contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: String`);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomStringArray()],
        [data.STDLIB_VERSION_4, random.getRandomStringArray()],
        [data.STDLIB_VERSION_5, random.getRandomStringArray()],
    ])('negative: invalid function for v%i', (version, testString) => {
        const contract = precondition.generateOnlyMatcherContract
        (version, testString, invalidFromBase16String);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'fromBase16String' requires 1 arguments, but 0 are provided`);
    });
});
