import * as data from "../../testData/data";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('parseBigIntValue',  () => {

    const defaultParseBigIntValue = `parseBigIntValue(callerTestData)`;
    const invalidParseBigIntValue = `parseBigIntValue()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultParseBigIntValue, null, 'BigInt');

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('positive: parseBigIntValue func compiles', (version, int) => {
        let intToStringForTest = `"${int}"`;
        let contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomInt()],
        [data.STDLIB_VERSION_4, data.getRandomInt()],
    ])('negative: Undefined type: `BigInt` for ride v%i', (version, int) => {
        let intToStringForTest = `"${int}"`;
        let contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain('Undefined type: `BigInt`');
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('negative: invalid byteVector in parseBigInt', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: String, actual: Int`);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('negative: invalid function for v%i', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract
        (version, byteVector, invalidParseBigIntValue);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'parseBigIntValue' requires 1 arguments, but 0 are provided`);
    });
});
