import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('sigVerify Range of functions.', () => {

    const sigVerify = `sigVerify(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify = `sigVerify()`;
    const sigVerifyArgBeforeFunc = `callerTestData.sigVerify(callerTestData, callerTestData)`;
    const invalidSigVerifyArgBeforeFunc = `callerTestData.sigVerify(callerTestData)`;

    const sigVerify_16Kb = `sigVerify_16Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_16Kb = `sigVerify_16Kb()`;
    const sigVerify_16KbArgBeforeFunc = `callerTestData.sigVerify_16Kb(callerTestData, callerTestData)`;
    const invalidSigVerify_16KbArgBeforeFunc = `callerTestData.sigVerify_16Kb(callerTestData, callerTestData)`;

    const sigVerify_32Kb = `sigVerify_32Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_32Kb = `sigVerify_32Kb()`;
    const sigVerify_32KbArgBeforeFunc = `callerTestData.sigVerify_32Kb(callerTestData, callerTestData)`;
    const invalidSigVerify_32KbArgBeforeFunc = `callerTestData.sigVerify_32Kb(callerTestData)`;

    const sigVerify_64Kb = `sigVerify_64Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_64Kb = `sigVerify_64Kb()`;
    const sigVerify_64KbArgBeforeFunc = `callerTestData.sigVerify_64Kb(callerTestData, callerTestData)`;
    const invalidSigVerify_64KbArgBeforeFunc = `callerTestData.sigVerify_64Kb(callerTestData)`;

    const sigVerify_128Kb = `sigVerify_128Kb(callerTestData, callerTestData, callerTestData)`;
    const invalidSigVerify_128Kb = `sigVerify_128Kb()`;
    const sigVerify_128KbArgBeforeFunc = `callerTestData.sigVerify_128Kb(callerTestData, callerTestData)`;
    const invalidSigVerify_128KbArgBeforeFunc = `callerTestData.sigVerify_128Kb(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(sigVerify);
    precondition.setData("Boolean");

    test.each([
        // positive sigVerify tests
        [data.STDLIB_VERSION_3, sigVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, sigVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify
        [data.STDLIB_VERSION_3, sigVerify, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sigVerify, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function sigVerify
        [data.STDLIB_VERSION_3, invalidSigVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSigVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sigVerify tests argument before function
        [data.STDLIB_VERSION_3, sigVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, sigVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerifyArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify
        [data.STDLIB_VERSION_3, sigVerifyArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sigVerifyArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerifyArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerifyArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function sigVerify
        [data.STDLIB_VERSION_3, invalidSigVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSigVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerifyArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sigVerify_16Kb tests
        [data.STDLIB_VERSION_4, sigVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_16Kb
        [data.STDLIB_VERSION_4, sigVerify_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_16Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sigVerify_16Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_16Kb, sigVerify_32Kb, sigVerify_64Kb, sigVerify_128Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sigVerify_16Kb tests argument before function
        [data.STDLIB_VERSION_4, sigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_16Kb
        [data.STDLIB_VERSION_4, sigVerify_16KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_16KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_16KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sigVerify_16Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_16Kb, sigVerify_32Kb, sigVerify_64Kb, sigVerify_128Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sigVerify_32Kb tests
        [data.STDLIB_VERSION_4, sigVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_32Kb
        [data.STDLIB_VERSION_4, sigVerify_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_32Kb, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function SigVerify_32Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_32Kb, for v3
        [data.STDLIB_VERSION_3, sigVerify_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sigVerify_32Kb tests argument before function
        [data.STDLIB_VERSION_4, sigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_32Kb
        [data.STDLIB_VERSION_4, sigVerify_32KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_32KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_32KbArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function SigVerify_32Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_32Kb, for v3
        [data.STDLIB_VERSION_3, sigVerify_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sigVerify_64Kb tests
        [data.STDLIB_VERSION_4, sigVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_64Kb
        [data.STDLIB_VERSION_4, sigVerify_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_64Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function sigVerify_64Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_64Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sigVerify_64Kb tests argument before function
        [data.STDLIB_VERSION_4, sigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_64Kb
        [data.STDLIB_VERSION_4, sigVerify_64KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_64KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_64KbArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function sigVerify_64Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_64Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive sigVerify_128Kb tests
        [data.STDLIB_VERSION_4, sigVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_128Kb
        [data.STDLIB_VERSION_4, sigVerify_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_128Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sigVerify_128Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_128Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive sigVerify_128Kb tests argument before function
        [data.STDLIB_VERSION_4, sigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in sigVerify_128Kb
        [data.STDLIB_VERSION_4, sigVerify_128KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sigVerify_128KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sigVerify_128KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function sigVerify_128Kb
        [data.STDLIB_VERSION_4, invalidSigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function sigVerify_128Kb for v3
        [data.STDLIB_VERSION_3, sigVerify_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
