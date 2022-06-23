import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toBytes',  () => {

    const toBytes = `toBytes(callerTestData)`;
    const invalidToBytes = 'toBytes()';

    const toBytesArgBeforeFunc = `callerTestData.toBytes()`;
    const invalidToBytesArgBeforeFunc = `callerTestData.toBytes(callerTestData,callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(toBytes);
    precondition.setData("ByteVector");

    test.each([
        [data.STDLIB_VERSION_3, toBytes, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toBytes, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toBytes, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toBytes, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toBytes, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toBytes, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytes, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytes, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytes, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytes, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytes, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytes, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, toBytes, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toBytes, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toBytes, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toBytes, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidToBytes, true, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToBytes, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToBytes, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToBytes, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],

        // argument before function
        [data.STDLIB_VERSION_3, toBytesArgBeforeFunc, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toBytesArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, toBytesArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toBytesArgBeforeFunc, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toBytesArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, toBytesArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytesArgBeforeFunc, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytesArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytesArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytesArgBeforeFunc, false, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytesArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytesArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, toBytesArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, toBytesArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, toBytesArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, toBytesArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidToBytesArgBeforeFunc, true, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToBytesArgBeforeFunc, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToBytesArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToBytesArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, func, testData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testData, func);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, toBytes, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytes, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, toBytesArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, toBytesArgBeforeFunc, random.getRandomInt(), data.POSITIVE_TEST],

        [data.STDLIB_VERSION_5, invalidToBytes, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToBytes, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToBytesArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidToBytesArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('positive: toBytes func compiles for ride v%i at bigInt', (version, func, bigInt, testType) => {
        const intToBigInt = `toBigInt(${bigInt})`;
        const contract = precondition.generateOnlyMatcherContract(version, intToBigInt, func);
        checkCompileResult(contract, testType);
    });
});
