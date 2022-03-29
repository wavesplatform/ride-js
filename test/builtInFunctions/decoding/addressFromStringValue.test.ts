import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('addressFromStringValue',  () => {

    const defaultAddressFromStringValue = `addressFromStringValue(callerTestData)`;
    const invalidAddressFromStringValue = `addressFromStringValue()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultAddressFromStringValue, null, 'Address');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomStringArray()],
        [data.STDLIB_VERSION_4, random.getRandomStringArray()],
        [data.STDLIB_VERSION_5, random.getRandomStringArray()],
    ])('positive: addressFromStringValue func compiles', (version, testString) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString);
        console.log(contract)
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, 1],
    ])('negative: invalid byteVector in addressFromStringValue', (version, byteVector) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
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
        (version, testString, invalidAddressFromStringValue);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'addressFromStringValue' requires 1 arguments, but 0 are provided`);
    });
});
