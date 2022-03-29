import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('addressFromPublicKey',  () => {

    const defaultAddressFromPublicKey = `addressFromPublicKey(callerTestData)`;
    const invalidAddressFromPublicKey = `addressFromPublicKey()`;

    const precondition = new GenerateContractForBuiltInFunctions
        (defaultAddressFromPublicKey, null, 'Address');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('positive: addressFromPublicKey func compiles', (version, byteVector) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, 1],
    ])('negative: invalid byteVector in addressFromPublicKey', (version, byteVector) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: ByteVector`);
    });

    test.each([
        [data.STDLIB_VERSION_3,random.getRandomByteVector()],
        [data.STDLIB_VERSION_4, random.getRandomByteVector()],
        [data.STDLIB_VERSION_5, random.getRandomByteVector()],
    ])('negative: invalid function for v%i', (version, byteVector) => {
        const contract = precondition.generateOnlyMatcherContract
        (version, byteVector, invalidAddressFromPublicKey);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'addressFromPublicKey' requires 1 arguments, but 0 are provided`);
    });
});
