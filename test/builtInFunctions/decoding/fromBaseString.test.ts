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

    const fromBase16StringArgBeforeFunc = `callerTestData.fromBase16String()`;
    const fromBase58StringArgBeforeFunc = `callerTestData.fromBase58String()`;
    const fromBase64StringArgBeforeFunc = `callerTestData.fromBase64String()`;
    const invalidFromBase16StringArgBeforeFunc = `callerTestData.fromBase16String(callerTestData)`;
    const invalidFromBase58StringArgBeforeFunc = `callerTestData.fromBase58String(callerTestData)`;
    const invalidFromBase64StringArgBeforeFunc = `callerTestData.fromBase64String(callerTestData)`;


    const precondition = new GenerateContractForBuiltInFunctions(fromBase16String);
    precondition.setData("ByteVector");

    test.each([
        // fromBase16String
        [data.STDLIB_VERSION_3, fromBase16String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase16String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase16String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase16String, random.getRandomString(), data.POSITIVE_TEST],
        // fromBase58String
        [data.STDLIB_VERSION_3, fromBase58String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase58String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase58String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase58String, random.getRandomString(), data.POSITIVE_TEST],
        // fromBase64String
        [data.STDLIB_VERSION_3, fromBase64String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase64String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase64String, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase64String, random.getRandomString(), data.POSITIVE_TEST],
        // negative: invalid data
        [data.STDLIB_VERSION_3, invalidFromBase16String, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidFromBase58String, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFromBase64String, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFromBase16String, random.getRandomInt(), data.NEGATIVE_TEST],
        // negative: invalid function
        [data.STDLIB_VERSION_3, invalidFromBase16String, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidFromBase58String, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFromBase64String, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFromBase16String, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // fromBase16String argument before functions
        [data.STDLIB_VERSION_3, fromBase16StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase16StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase16StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase16StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        // fromBase58String argument before functions
        [data.STDLIB_VERSION_3, fromBase58StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase58StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase58StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase58StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        // fromBase64String argument before functions
        [data.STDLIB_VERSION_3, fromBase64StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase64StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase64StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase64StringArgBeforeFunc, random.getRandomString(), data.POSITIVE_TEST],
        // negative: invalid data argument before functions
        [data.STDLIB_VERSION_3, fromBase16StringArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, fromBase58StringArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, fromBase64StringArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, fromBase16StringArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        // negative: invalid function argument before functions
        [data.STDLIB_VERSION_3, invalidFromBase16StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidFromBase58StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidFromBase64StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidFromBase16StringArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, testString, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});
