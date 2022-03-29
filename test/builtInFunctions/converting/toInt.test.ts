import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('toInt',  () => {

    const defaultToIntFunction = `toInt(callerTestData)`;
    const toIntFromByteVectorOnIndex = `toInt(callerTestData, 2)`;
    const invalidToInt = 'toInt()';

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultToIntFunction, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('positive: toInt func compiles for ride v%i at ByteVector', (version, testData) => {
        let contract = precondition.generateOnlyMatcherContract(version, testData);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('positive: toInt func compiles for ride v%i at ByteVector on index', (version, testData) => {
        let contract = precondition.generateOnlyMatcherContract(version, testData, toIntFromByteVectorOnIndex);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: toInt func compiles for ride v%i at bigInt', (version, bigInt) => {
        let contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${bigInt})`);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, random.getRandomAddress()],
        [data.STDLIB_VERSION_5, random.getRandomIssuesArray()],
    ])('negative: invalid data in toInt for ride v%i', (version, invalidData) => {
        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toInt'`);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid function for v%i', (version, int) => {
        let contract = precondition.generateOnlyMatcherContract(version, int, invalidToInt);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toInt'()`);
    });
});
