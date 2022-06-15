import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toBytes',  () => {

    const defaultToBytesFunction = `toBytes(callerTestData)`;
    const invalidToBytes = 'toBytes()';

    const precondition = new GenerateContractForBuiltInFunctions(defaultToBytesFunction);
    precondition.setData("ByteVector");

    test.each([
        [data.STDLIB_VERSION_3, defaultToBytesFunction, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, defaultToBytesFunction, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, defaultToBytesFunction, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, defaultToBytesFunction, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, defaultToBytesFunction, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, defaultToBytesFunction, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, defaultToBytesFunction, true, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, defaultToBytesFunction, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, defaultToBytesFunction, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, defaultToBytesFunction, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, defaultToBytesFunction, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, defaultToBytesFunction, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidToBytes, true, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidToBytes, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidToBytes, random.getRandomIssue(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, testData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testData, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, random.getRandomInt(), data.POSITIVE_TEST],
    ])('positive: toBytes func compiles for ride v%i at bigInt', (version, bigInt, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, `toBigInt(${bigInt})`);
        checkCompileResult(contract, testType);
    });
});
