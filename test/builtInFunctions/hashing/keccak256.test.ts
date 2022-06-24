import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('keccak256 Range of functions.', () => {

    const keccak256 = `keccak256(callerTestData)`;
    const invalidKeccak256 = `keccak256()`;
    const keccak256ArgBeforeFunc = `callerTestData.keccak256()`;
    const invalidKeccak256ArgBeforeFunc = `callerTestData.keccak256(callerTestData)`;

    const keccak256_16Kb = `keccak256_16Kb(callerTestData)`;
    const invalidKeccak256_16Kb = `keccak256_16Kb()`;
    const keccak256_16KbArgBeforeFunc = `callerTestData.keccak256_16Kb()`;
    const invalidKeccak256_16KbArgBeforeFunc = `callerTestData.keccak256_16Kb(callerTestData)`;

    const keccak256_32Kb = `keccak256_32Kb(callerTestData)`;
    const invalidKeccak256_32Kb = `keccak256_32Kb()`;
    const keccak256_32KbArgBeforeFunc = `callerTestData.keccak256_32Kb()`;
    const invalidKeccak256_32KbArgBeforeFunc = `callerTestData.keccak256_32Kb(callerTestData)`;

    const keccak256_64Kb = `keccak256_64Kb(callerTestData)`;
    const invalidKeccak256_64Kb = `keccak256_64Kb()`;
    const keccak256_64KbArgBeforeFunc = `callerTestData.keccak256_64Kb()`;
    const invalidKeccak256_64KbArgBeforeFunc = `callerTestData.keccak256_64Kb(callerTestData)`;

    const keccak256_128Kb = `keccak256_128Kb(callerTestData)`;
    const invalidKeccak256_128Kb = `keccak256_128Kb()`;
    const keccak256_128KbArgBeforeFunc = `callerTestData.keccak256_128Kb()`;
    const invalidKeccak256_128KbArgBeforeFunc = `callerTestData.keccak256_128Kb(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(keccak256);
    precondition.setData("ByteVector");

    test.each([
        // positive keccak256 tests
        [data.STDLIB_VERSION_3, keccak256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, keccak256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256
        [data.STDLIB_VERSION_3, keccak256, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, keccak256, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function keccak256
        [data.STDLIB_VERSION_3, invalidKeccak256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidKeccak256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive keccak256 tests argument before function
        [data.STDLIB_VERSION_3, keccak256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, keccak256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256ArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256
        [data.STDLIB_VERSION_3, keccak256ArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, keccak256ArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256ArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256ArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function keccak256
        [data.STDLIB_VERSION_3, invalidKeccak256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidKeccak256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256ArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive keccak256_16Kb tests
        [data.STDLIB_VERSION_4, keccak256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_16Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_16Kb
        [data.STDLIB_VERSION_4, keccak256_16Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_16Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_16Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function keccak256_16Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_16Kb, keccak256_32Kb, keccak256_64Kb, keccak256_128Kb for v3
        [data.STDLIB_VERSION_3, keccak256_16Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive keccak256_16Kb tests argument before function
        [data.STDLIB_VERSION_4, keccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_16Kb
        [data.STDLIB_VERSION_4, keccak256_16KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_16KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_16KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function keccak256_16Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_16Kb, keccak256_32Kb, keccak256_64Kb, keccak256_128Kb for v3
        [data.STDLIB_VERSION_3, keccak256_16KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive keccak256_32Kb tests
        [data.STDLIB_VERSION_4, keccak256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_32Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_32Kb
        [data.STDLIB_VERSION_4, keccak256_32Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_32Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_32Kb, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function Keccak256_32Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_32Kb, for v3
        [data.STDLIB_VERSION_3, keccak256_32Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive keccak256_32Kb tests argument before function
        [data.STDLIB_VERSION_4, keccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_32Kb
        [data.STDLIB_VERSION_4, keccak256_32KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_32KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_32KbArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function Keccak256_32Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_32Kb, for v3
        [data.STDLIB_VERSION_3, keccak256_32KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive keccak256_64Kb tests
        [data.STDLIB_VERSION_4, keccak256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_64Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_64Kb
        [data.STDLIB_VERSION_4, keccak256_64Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_64Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_64Kb, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function keccak256_64Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_64Kb for v3
        [data.STDLIB_VERSION_3, keccak256_64Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive keccak256_64Kb tests argument before function
        [data.STDLIB_VERSION_4, keccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_64Kb
        [data.STDLIB_VERSION_4, keccak256_64KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_64KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_64KbArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        // invalid function keccak256_64Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_64Kb for v3
        [data.STDLIB_VERSION_3, keccak256_64KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // positive keccak256_128Kb tests
        [data.STDLIB_VERSION_4, keccak256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_128Kb, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_128Kb
        [data.STDLIB_VERSION_4, keccak256_128Kb, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_128Kb, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_128Kb, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function keccak256_128Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_128Kb for v3
        [data.STDLIB_VERSION_3, keccak256_128Kb, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // positive keccak256_128Kb tests argument before function
        [data.STDLIB_VERSION_4, keccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // Non-matching types in keccak256_128Kb
        [data.STDLIB_VERSION_4, keccak256_128KbArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, keccak256_128KbArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, keccak256_128KbArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function keccak256_128Kb
        [data.STDLIB_VERSION_4, invalidKeccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidKeccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidKeccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // negative Can't find a function keccak256_128Kb for v3
        [data.STDLIB_VERSION_3, keccak256_128KbArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
