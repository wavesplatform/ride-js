import * as data from "../../testData/data";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('toBigInt',  () => {

    const toBigIntFromByteVector = `toBigInt(callerTestData)`;
    const toBigIntFromByteVectorOnIndex = `toBigInt(callerTestData, 1, 6)`;
    const toBigIntFromInt = 'toBigInt(callerTestData)';
    const invalidToBigInt = 'toBigInt()';

    let precondition;

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: toBigInt(byteVector) func compiles for ride v%i', (version, byteVector) => {
        precondition = new GenerateContractForBuiltInFunctions
        (toBigIntFromByteVector, null, 'BigInt');

        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomByteVector()],
    ])('positive: toBigInt(byteVector) func compiles for ride v%i on index', (version, byteVector) => {
        precondition = new GenerateContractForBuiltInFunctions
        (toBigIntFromByteVectorOnIndex, null, 'BigInt');

        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('positive: toBigInt(Int) func compiles for ride v%i on index', (version, byteVector) => {
        precondition = new GenerateContractForBuiltInFunctions
        (toBigIntFromInt, null, 'BigInt');

        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, data.getRandomByteVector()],
        [data.STDLIB_VERSION_4, data.getRandomByteVector()],
    ])('negative: Undefined type: `BigInt` for ride v%i', (version, byteVector) => {
        precondition = new GenerateContractForBuiltInFunctions
        (toBigIntFromByteVector, null, 'BigInt');

        let contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain('Undefined type: `BigInt`');
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomAlias()],
        [data.STDLIB_VERSION_5, data.getRandomAddress()],
        [data.STDLIB_VERSION_5, data.getRandomIssuesArray()],
    ])('negative: invalid data in toBigInt for ride v%i', (version, invalidData) => {
        precondition = new GenerateContractForBuiltInFunctions
        (toBigIntFromByteVector, null, 'BigInt');

        let contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toBigInt'`);
    });

    test.each([
        [data.STDLIB_VERSION_5, data.getRandomInt()],
    ])('negative: invalid function for v%i', (version, int) => {
        precondition = new GenerateContractForBuiltInFunctions
        (invalidToBigInt, null, 'BigInt');

        let contract = precondition.generateOnlyMatcherContract(version, int);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Can't find a function overload 'toBigInt'()`);
    });
});
