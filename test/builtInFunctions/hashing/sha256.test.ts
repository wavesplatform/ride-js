import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('sha256 Range of functions.',  () => {

    const sha256 = `sha256(callerTestData)`;
    const invalidSha256 = `sha256()`;
    const sha256_16Kb = `sha256_16Kb(callerTestData)`;
    const invalidSha256_16Kb = `sha256_16Kb()`;
    const sha256_32Kb = `sha256_32Kb(callerTestData)`;
    const invalidSha256_32Kb = `sha256_32Kb()`;
    const sha256_64Kb = `sha256_64Kb(callerTestData)`;
    const invalidSha256_64Kb = `sha256_64Kb()`;
    const sha256_128Kb = `sha256_128Kb(callerTestData)`;
    const invalidSha256_128Kb = `sha256_128Kb()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (sha256, null, 'ByteVector');

    test.each([
        // positive sha256 tests
        [data.STDLIB_VERSION_3, sha256, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, sha256, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sha256, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sha256
        [data.STDLIB_VERSION_3, invalidSha256, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidSha256, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256, random.getRandomInt(), data.negativeTestType],
        // invalid function sha256
        [data.STDLIB_VERSION_3, invalidSha256, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidSha256, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256, random.getRandomByteVector(), data.negativeTestType],

        // positive sha256_16Kb tests
        [data.STDLIB_VERSION_4, sha256_16Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sha256_16Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sha256_16Kb
        [data.STDLIB_VERSION_4, invalidSha256_16Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_16Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sha256_16Kb
        [data.STDLIB_VERSION_4, invalidSha256_16Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_16Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sha256_32Kb tests
        [data.STDLIB_VERSION_4, sha256_32Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sha256_32Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sha256_32Kb
        [data.STDLIB_VERSION_4, invalidSha256_32Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_32Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sha256_32Kb
        [data.STDLIB_VERSION_4, invalidSha256_32Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_32Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sha256_64Kb tests
        [data.STDLIB_VERSION_4, sha256_64Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sha256_64Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sha256_64Kb
        [data.STDLIB_VERSION_4, invalidSha256_64Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_64Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sha256_64Kb
        [data.STDLIB_VERSION_4, invalidSha256_64Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_64Kb, random.getRandomByteVector(), data.negativeTestType],

        // positive sha256_128Kb tests
        [data.STDLIB_VERSION_4, sha256_128Kb, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, sha256_128Kb, random.getRandomByteVector(), data.positiveTestType],
        // invalid byteVector in sha256_128Kb
        [data.STDLIB_VERSION_4, invalidSha256_128Kb, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_128Kb, random.getRandomInt(), data.negativeTestType],
        // invalid function sha256_128Kb
        [data.STDLIB_VERSION_4, invalidSha256_128Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSha256_128Kb, random.getRandomByteVector(), data.negativeTestType],

        // negative Can't find a function sha256_16Kb, sha256_32Kb, sha256_64Kb, sha256_128Kb for v3
        [data.STDLIB_VERSION_3, sha256_16Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sha256_32Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sha256_64Kb, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_3, sha256_128Kb, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
