import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('rsaVerify Range of functions.', () => {

    const rsaVerify =
        `rsaVerify(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify = `rsaVerify()`;
    const rsaVerifyArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify(callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerifyArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify(callerTestData)`;

    const rsaVerify_16Kb = `rsaVerify_16Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_16Kb = `rsaVerify_16Kb()`;
    const rsaVerify_16KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_16Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_16KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_16Kb(callerTestData)`;

    const rsaVerify_32Kb = `rsaVerify_32Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_32Kb = `rsaVerify_32Kb()`;
    const rsaVerify_32KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_32Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_32KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_32Kb(callerTestData)`;

    const rsaVerify_64Kb = `rsaVerify_64Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_64Kb = `rsaVerify_64Kb()`;
    const rsaVerify_64KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_64Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_64KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_64Kb(callerTestData)`;

    const rsaVerify_128Kb = `rsaVerify_128Kb(${random.getRandomDigestAlgorithmType()}, callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_128Kb = `rsaVerify_128Kb()`;
    const rsaVerify_128KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_128Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidRsaVerify_128KbArgBeforeFunc = `${random.getRandomDigestAlgorithmType()}.rsaVerify_128Kb(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(rsaVerify);
    precondition.setData("Boolean");

    test.each([
        // positive rsaVerify tests
        [data.STDLIB_VERSION_3, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify
        [data.STDLIB_VERSION_3, rsaVerify, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, rsaVerify, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function rsaVerify
        [data.STDLIB_VERSION_3, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify tests argument before function
        [data.STDLIB_VERSION_3, rsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, rsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify
        [data.STDLIB_VERSION_3, rsaVerifyArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, rsaVerifyArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerifyArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerifyArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function rsaVerify
        [data.STDLIB_VERSION_3, invalidRsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidRsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive rsaVerify_16Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_16Kb
        [data.STDLIB_VERSION_4, rsaVerify_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_16Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_16Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_16Kb, rsaVerify_32Kb, rsaVerify_64Kb, rsaVerify_128Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_16Kb tests argument before function
        [data.STDLIB_VERSION_4, rsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_16Kb
        [data.STDLIB_VERSION_4, rsaVerify_16KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_16KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_16KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_16Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_16Kb, rsaVerify_32Kb, rsaVerify_64Kb, rsaVerify_128Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive rsaVerify_32Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_32Kb
        [data.STDLIB_VERSION_4, rsaVerify_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_32Kb, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function RsaVerify_32Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_32Kb, for v3
        [data.STDLIB_VERSION_3, rsaVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_32Kb tests argument before function
        [data.STDLIB_VERSION_4, rsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_32Kb
        [data.STDLIB_VERSION_4, rsaVerify_32KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_32KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_32KbArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function RsaVerify_32Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_32Kb, for v3
        [data.STDLIB_VERSION_3, rsaVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive rsaVerify_64Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_64Kb
        [data.STDLIB_VERSION_4, rsaVerify_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_64Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_64Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_64Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_64Kb tests argument before function
        [data.STDLIB_VERSION_4, rsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_64Kb
        [data.STDLIB_VERSION_4, rsaVerify_64KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_64KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_64KbArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_64Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_64Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive rsaVerify_128Kb tests
        [data.STDLIB_VERSION_4, rsaVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_128Kb
        [data.STDLIB_VERSION_4, rsaVerify_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_128Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_128Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_128Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive rsaVerify_128Kb tests argument before function
        [data.STDLIB_VERSION_4, rsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in rsaVerify_128Kb
        [data.STDLIB_VERSION_4, rsaVerify_128KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, rsaVerify_128KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, rsaVerify_128KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function rsaVerify_128Kb
        [data.STDLIB_VERSION_4, invalidRsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function rsaVerify_128Kb for v3
        [data.STDLIB_VERSION_3, rsaVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
