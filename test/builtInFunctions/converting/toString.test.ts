import * as data from "../../testData/data";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('toString',  () => {

    const defaultToStringFunction = `toString(callerTestData)`;
    const invalidToString = 'toString()';

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultToStringFunction, null, 'String');

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomAddress()],
        [data.STDLIB_VERSION_3, false],
        [data.STDLIB_VERSION_3, data.getRandomInt()],
        [data.STDLIB_VERSION_4, data.getRandomAddress()],
        [data.STDLIB_VERSION_4, true],
        [data.STDLIB_VERSION_4, data.getRandomInt()],
        [data.STDLIB_VERSION_5, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, false],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('positive: toString func compiles for ride v%i at correct data structures', (version, testData) => {
        let contract = precondition.generateOnlyMatcherContract(version, testData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('positive: toString func compiles for ride v%i at bigInt', (version, bigInt) => {
        let contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${bigInt})`);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.getRandomIssuesArray()],
    ])('negative: invalid data in toString for ride v%i', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toString'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, true],
        [data.STDLIB_VERSION_4, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('negative: invalid function for v%i', (version, int) => {
        let contract = precondition.generateOnlyMatcherContract(version, int, invalidToString);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toString'()`);
    });
});
