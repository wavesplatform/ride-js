import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('parseBigInt ',  () => {

    const defaultParseBigInt = `parseBigInt(callerTestData)`;
    const invalidParseBigInt = `parseBigInt()`;

    const precondition = new GenerateContractForBuiltInFunctions
        (defaultParseBigInt, null, 'BigInt');

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('positive: parseBigInt func compiles', (version, int) => {
        let intToStringForTest = `"${int}"`;
        let contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomInt()],
        [data.STDLIB_VERSION_4, random.getRandomInt()],
    ])('negative: Undefined type: `BigInt` for ride v%i', (version, int) => {
        let intToStringForTest = `"${int}"`;
        let contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain('Undefined type: `BigInt`');
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomInt()],
    ])('negative: invalid data in parseBigInt', (version, byteVector) => {
        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: String, actual: Int`);
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('negative: invalid function for v%i', (version, int) => {
        let contract = precondition.generateOnlyMatcherContract
        (version, int, invalidParseBigInt);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'parseBigInt' requires 1 arguments, but 0 are provided`);
    });
});
