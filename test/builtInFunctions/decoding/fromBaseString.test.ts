import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('fromBaseString',  () => {

    const fromBase16String = `fromBase16String(callerTestData)`;
    const fromBase58String = `fromBase58String(callerTestData)`;
    const fromBase64String = `fromBase64String(callerTestData)`;

    const invalidFromBase16String = `fromBase16String()`;
    const invalidFromBase58String = `fromBase58String()`;
    const invalidFromBase64String = `fromBase64String()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (fromBase16String, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_3, fromBase16String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, fromBase16String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, fromBase16String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_3, fromBase58String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, fromBase58String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, fromBase58String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_3, fromBase64String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, fromBase64String, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, fromBase64String, random.getRandomStringArray(), data.positiveTestType],
        // negative: invalid byteVector
        [data.STDLIB_VERSION_3, invalidFromBase16String, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidFromBase58String, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidFromBase64String, random.getRandomInt(), data.negativeTestType],
        // negative: invalid function
        [data.STDLIB_VERSION_3, invalidFromBase16String, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidFromBase58String, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidFromBase64String, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
