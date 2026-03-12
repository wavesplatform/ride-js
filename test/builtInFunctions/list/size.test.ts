import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('size function',  () => {

    const size = `size(callerTestData)`;
    const invalidSize = `size()`;
    const sizeArgBeforeFunc = `callerTestData.size()`;
    const invalidSizeArgBeforeFunc = `callerTestData.size(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(size);
    precondition.setData("Int");

    test.each([
        // size
        [data.STDLIB_VERSION_3, size, data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, size, data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, size, data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, size, data.intList, data.POSITIVE_TEST],
        // invalid data size
        [data.STDLIB_VERSION_3, size, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, size, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, size, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, size, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function size
        [data.STDLIB_VERSION_3, invalidSize, data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSize, data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSize, data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSize, data.intList, data.NEGATIVE_TEST],

        // size argument before function
        [data.STDLIB_VERSION_3, sizeArgBeforeFunc, data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, sizeArgBeforeFunc, data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sizeArgBeforeFunc, data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sizeArgBeforeFunc, data.intList, data.POSITIVE_TEST],
        // invalid data size argument before function
        [data.STDLIB_VERSION_3, sizeArgBeforeFunc, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sizeArgBeforeFunc, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sizeArgBeforeFunc, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sizeArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function size argument before function
        [data.STDLIB_VERSION_3, invalidSizeArgBeforeFunc, data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSizeArgBeforeFunc, data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSizeArgBeforeFunc, data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSizeArgBeforeFunc, data.intList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, list, testType) => {
            const contract = precondition.generateOnlyMatcherContract(version, list, testFunction);
            checkCompileResult(contract, testType);
    });
});
