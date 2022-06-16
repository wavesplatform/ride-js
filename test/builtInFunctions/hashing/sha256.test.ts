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

    const precondition = new GenerateContractForBuiltInFunctions(sha256);
    precondition.setData("ByteVector");

    test.each([
        // positive sha256 tests
        [data.STDLIB_VERSION_3, sha256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, sha256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256
        [data.STDLIB_VERSION_3, sha256, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sha256, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function sha256
        [data.STDLIB_VERSION_3, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_16Kb tests
        [data.STDLIB_VERSION_4, sha256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_16Kb
        [data.STDLIB_VERSION_4, sha256_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function sha256_16Kb
        [data.STDLIB_VERSION_4, invalidSha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_32Kb tests
        [data.STDLIB_VERSION_4, sha256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_32Kb
        [data.STDLIB_VERSION_4, sha256_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function sha256_32Kb
        [data.STDLIB_VERSION_4, invalidSha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_64Kb tests
        [data.STDLIB_VERSION_4, sha256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_64Kb
        [data.STDLIB_VERSION_4, sha256_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function sha256_64Kb
        [data.STDLIB_VERSION_4, invalidSha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_128Kb tests
        [data.STDLIB_VERSION_4, sha256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_128Kb
        [data.STDLIB_VERSION_4, sha256_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function sha256_128Kb
        [data.STDLIB_VERSION_4, invalidSha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // negative Can't find a function sha256_16Kb, sha256_32Kb, sha256_64Kb, sha256_128Kb for v3
        [data.STDLIB_VERSION_3, sha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, sha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, sha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, sha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
