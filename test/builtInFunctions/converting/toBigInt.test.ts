import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toBigInt',  () => {

    const toBigInt = `toBigInt(callerTestData)`;
    const toBigIntOnIndex = `toBigInt(callerTestData, 1, ${random.getRandomInt()})`;
    const toBigIntArgBeforeFunc = `callerTestData.toBigInt()`;
    const toBigIntOnIndexArgBeforeFunc = `callerTestData.toBigInt(1, ${random.getRandomInt()})`;

    const invalidToBigInt = 'toBigInt()';
    const invalidToBigIntArgBeforeFunc = 'callerTestData.toBigInt(callerTestData)';

    let precondition = new GenerateContractForBuiltInFunctions(toBigInt);
    precondition.setData("BigInt");

    test.each([
        [data.STDLIB_VERSION_5, toBigInt, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBigInt, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBigIntOnIndex, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntOnIndex, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data in toBigInt
        [data.STDLIB_VERSION_5, toBigIntOnIndex, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntOnIndex, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toBigInt, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toBigInt, random.getRandomIssue(), data.NEGATIVE_TEST],
        // Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, toBigInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toBigIntOnIndex, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_5, invalidToBigInt, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToBigInt, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // argument before functions
        [data.STDLIB_VERSION_5, toBigIntArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBigIntOnIndexArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntOnIndexArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data in toBigInt
        [data.STDLIB_VERSION_5, toBigIntArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toBigIntOnIndexArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toBigIntOnIndexArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        // Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, toBigIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toBigIntOnIndexArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_5, invalidToBigIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToBigIntArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });
});
