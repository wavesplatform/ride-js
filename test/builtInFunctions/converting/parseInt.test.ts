import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('parseInt',  () => {

    const defaultParseInt = `parseInt(callerTestData)`;
    const invalidParseInt = `parseInt()`;
    const invalidStringForTests = 'invalid string';

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultParseInt, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: parseInt func compiles for ride v%i', (version, int) => {
        let intToStringForTest = `"${int}"`;
        const contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid data in parseInt for ride v%i', (version, int) => {
        const contract = precondition.generateOnlyMatcherContract(version, int);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: String, actual: Int`);
    });

    test.each([
        [data.STDLIB_VERSION_3, invalidStringForTests],
        [data.STDLIB_VERSION_4, invalidStringForTests],
        [data.STDLIB_VERSION_5, invalidStringForTests],
    ])('negative: invalid string in parseInt for ride v%i', (version, str) => {
        const contract = precondition.generateOnlyMatcherContract(version, str);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Parsed.Failure`);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid function for v%i', (version, int) => {
        const contract = precondition.generateOnlyMatcherContract(version, int, invalidParseInt);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'parseInt' requires 1 arguments, but 0 are provided`);
    });
});
