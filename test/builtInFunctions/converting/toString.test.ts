import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('toString',  () => {

    const defaultToStringFunction = `toString(callerTestData)`;
    const invalidToString = 'toString()';

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultToStringFunction, null, 'String');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_3, false],
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, true],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, false],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: toString func compiles for ride v%i at correct data structures', (version, testData) => {
        const contract = precondition.generateOnlyMatcherContract(version, testData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: toString func compiles for ride v%i at bigInt', (version, bigInt) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${bigInt})`);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray()],
    ])('negative: invalid data in toString for ride v%i', (version, invalidData) => {
        const contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toString'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, true],
        [data.STDLIB_VERSION_4, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid function for v%i', (version, int) => {
        const contract = precondition.generateOnlyMatcherContract(version, int, invalidToString);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toString'()`);
    });
});
