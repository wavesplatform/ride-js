import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('sha256 Range of functions.', () => {

    const sha256 = `sha256(callerTestData)`;
    const invalidSha256 = `sha256()`;
    const sha256ArgBeforeFunc = `callerTestData.sha256()`;
    const invalidSha256ArgBeforeFunc = `callerTestData.sha256(callerTestData)`;

    const sha256_16Kb = `sha256_16Kb(callerTestData)`;
    const invalidSha256_16Kb = `sha256_16Kb()`;
    const sha256_16KbArgBeforeFunc = `callerTestData.sha256_16Kb()`;
    const invalidSha256_16KbArgBeforeFunc = `callerTestData.sha256_16Kb(callerTestData)`;

    const sha256_32Kb = `sha256_32Kb(callerTestData)`;
    const invalidSha256_32Kb = `sha256_32Kb()`;
    const sha256_32KbArgBeforeFunc = `callerTestData.sha256_32Kb()`;
    const invalidSha256_32KbArgBeforeFunc = `callerTestData.sha256_32Kb(callerTestData)`;

    const sha256_64Kb = `sha256_64Kb(callerTestData)`;
    const invalidSha256_64Kb = `sha256_64Kb()`;
    const sha256_64KbArgBeforeFunc = `callerTestData.sha256_64Kb()`;
    const invalidSha256_64KbArgBeforeFunc = `callerTestData.sha256_64Kb(callerTestData)`;

    const sha256_128Kb = `sha256_128Kb(callerTestData)`;
    const invalidSha256_128Kb = `sha256_128Kb()`;
    const sha256_128KbArgBeforeFunc = `callerTestData.sha256_128Kb()`;
    const invalidSha256_128KbArgBeforeFunc = `callerTestData.sha256_128Kb(callerTestData)`;

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
        [data.STDLIB_VERSION_6, sha256, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function sha256
        [data.STDLIB_VERSION_3, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256 tests argument before function
        [data.STDLIB_VERSION_3, sha256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, sha256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256
        [data.STDLIB_VERSION_3, sha256ArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sha256ArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256ArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256ArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function sha256
        [data.STDLIB_VERSION_3, invalidSha256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSha256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sha256_16Kb tests
        [data.STDLIB_VERSION_4, sha256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_16Kb
        [data.STDLIB_VERSION_4, sha256_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_16Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sha256_16Kb
        [data.STDLIB_VERSION_4, invalidSha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_16Kb, sha256_32Kb, sha256_64Kb, sha256_128Kb for v3
        [data.STDLIB_VERSION_3, sha256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_16Kb tests argument before function
        [data.STDLIB_VERSION_4, sha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_16Kb
        [data.STDLIB_VERSION_4, sha256_16KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_16KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_16KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sha256_16Kb
        [data.STDLIB_VERSION_4, invalidSha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_16Kb, sha256_32Kb, sha256_64Kb, sha256_128Kb for v3
        [data.STDLIB_VERSION_3, sha256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sha256_32Kb tests
        [data.STDLIB_VERSION_4, sha256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_32Kb
        [data.STDLIB_VERSION_4, sha256_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_32Kb, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function Sha256_32Kb
        [data.STDLIB_VERSION_4, invalidSha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_32Kb, for v3
        [data.STDLIB_VERSION_3, sha256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_32Kb tests argument before function
        [data.STDLIB_VERSION_4, sha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_32Kb
        [data.STDLIB_VERSION_4, sha256_32KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_32KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_32KbArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function Sha256_32Kb
        [data.STDLIB_VERSION_4, invalidSha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_32Kb, for v3
        [data.STDLIB_VERSION_3, sha256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sha256_64Kb tests
        [data.STDLIB_VERSION_4, sha256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_64Kb
        [data.STDLIB_VERSION_4, sha256_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_64Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function sha256_64Kb
        [data.STDLIB_VERSION_4, invalidSha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_64Kb for v3
        [data.STDLIB_VERSION_3, sha256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_64Kb tests argument before function
        [data.STDLIB_VERSION_4, sha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_64Kb
        [data.STDLIB_VERSION_4, sha256_64KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_64KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_64KbArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function sha256_64Kb
        [data.STDLIB_VERSION_4, invalidSha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_64Kb for v3
        [data.STDLIB_VERSION_3, sha256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sha256_128Kb tests
        [data.STDLIB_VERSION_4, sha256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_128Kb
        [data.STDLIB_VERSION_4, sha256_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_128Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sha256_128Kb
        [data.STDLIB_VERSION_4, invalidSha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_128Kb for v3
        [data.STDLIB_VERSION_3, sha256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sha256_128Kb tests argument before function
        [data.STDLIB_VERSION_4, sha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sha256_128Kb
        [data.STDLIB_VERSION_4, sha256_128KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sha256_128KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sha256_128KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sha256_128Kb
        [data.STDLIB_VERSION_4, invalidSha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sha256_128Kb for v3
        [data.STDLIB_VERSION_3, sha256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
