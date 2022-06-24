import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('blake2b256 Range of functions.', () => {

    const blake2b256 = `blake2b256(callerTestData)`;
    const invalidBlake2b256 = `blake2b256()`;
    const blake2b256ArgBeforeFunc = `callerTestData.blake2b256()`;
    const invalidBlake2b256ArgBeforeFunc = `callerTestData.blake2b256(callerTestData)`;

    const blake2b256_16Kb = `blake2b256_16Kb(callerTestData)`;
    const invalidBlake2b256_16Kb = `blake2b256_16Kb()`;
    const blake2b256_16KbArgBeforeFunc = `callerTestData.blake2b256_16Kb()`;
    const invalidBlake2b256_16KbArgBeforeFunc = `callerTestData.blake2b256_16Kb(callerTestData)`;

    const blake2b256_32Kb = `blake2b256_32Kb(callerTestData)`;
    const invalidBlake2b256_32Kb = `blake2b256_32Kb()`;
    const blake2b256_32KbArgBeforeFunc = `callerTestData.blake2b256_32Kb()`;
    const invalidBlake2b256_32KbArgBeforeFunc = `callerTestData.blake2b256_32Kb(callerTestData)`;

    const blake2b256_64Kb = `blake2b256_64Kb(callerTestData)`;
    const invalidBlake2b256_64Kb = `blake2b256_64Kb()`;
    const blake2b256_64KbArgBeforeFunc = `callerTestData.blake2b256_64Kb()`;
    const invalidBlake2b256_64KbArgBeforeFunc = `callerTestData.blake2b256_64Kb(callerTestData)`;

    const blake2b256_128Kb = `blake2b256_128Kb(callerTestData)`;
    const invalidBlake2b256_128Kb = `blake2b256_128Kb()`;
    const blake2b256_128KbArgBeforeFunc = `callerTestData.blake2b256_128Kb()`;
    const invalidBlake2b256_128KbArgBeforeFunc = `callerTestData.blake2b256_128Kb(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(blake2b256);
    precondition.setData("ByteVector");

    test.each([
        // positive blake2b256 tests
        [data.STDLIB_VERSION_3, blake2b256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, blake2b256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256
        [data.STDLIB_VERSION_3, blake2b256, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, blake2b256, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function blake2b256
        [data.STDLIB_VERSION_3, invalidBlake2b256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidBlake2b256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive blake2b256 tests argument before function
        [data.STDLIB_VERSION_3, blake2b256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, blake2b256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256
        [data.STDLIB_VERSION_3, blake2b256ArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, blake2b256ArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256ArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256ArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function blake2b256
        [data.STDLIB_VERSION_3, invalidBlake2b256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidBlake2b256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive blake2b256_16Kb tests
        [data.STDLIB_VERSION_4, blake2b256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_16Kb
        [data.STDLIB_VERSION_4, blake2b256_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_16Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function blake2b256_16Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_16Kb, blake2b256_32Kb, blake2b256_64Kb, blake2b256_128Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive blake2b256_16Kb tests argument before function
        [data.STDLIB_VERSION_4, blake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_16Kb
        [data.STDLIB_VERSION_4, blake2b256_16KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_16KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_16KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function blake2b256_16Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_16Kb, blake2b256_32Kb, blake2b256_64Kb, blake2b256_128Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive blake2b256_32Kb tests
        [data.STDLIB_VERSION_4, blake2b256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_32Kb
        [data.STDLIB_VERSION_4, blake2b256_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_32Kb, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function Blake2b256_32Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_32Kb, for v3
        [data.STDLIB_VERSION_3, blake2b256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive blake2b256_32Kb tests argument before function
        [data.STDLIB_VERSION_4, blake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_32Kb
        [data.STDLIB_VERSION_4, blake2b256_32KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_32KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_32KbArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function Blake2b256_32Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_32Kb, for v3
        [data.STDLIB_VERSION_3, blake2b256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive blake2b256_64Kb tests
        [data.STDLIB_VERSION_4, blake2b256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_64Kb
        [data.STDLIB_VERSION_4, blake2b256_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_64Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function blake2b256_64Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_64Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive blake2b256_64Kb tests argument before function
        [data.STDLIB_VERSION_4, blake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_64Kb
        [data.STDLIB_VERSION_4, blake2b256_64KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_64KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_64KbArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function blake2b256_64Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_64Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive blake2b256_128Kb tests
        [data.STDLIB_VERSION_4, blake2b256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_128Kb
        [data.STDLIB_VERSION_4, blake2b256_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_128Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function blake2b256_128Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_128Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive blake2b256_128Kb tests argument before function
        [data.STDLIB_VERSION_4, blake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in blake2b256_128Kb
        [data.STDLIB_VERSION_4, blake2b256_128KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, blake2b256_128KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, blake2b256_128KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function blake2b256_128Kb
        [data.STDLIB_VERSION_4, invalidBlake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidBlake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidBlake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function blake2b256_128Kb for v3
        [data.STDLIB_VERSION_3, blake2b256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
