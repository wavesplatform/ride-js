import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String size function',  () => {

    const size = `size(callerTestData)`;
    const invalidSize = `size()`;

    const precondition = new GenerateContractForBuiltInFunctions(size);
    precondition.setData("Int");

    test.each([
        // size
        [data.STDLIB_VERSION_3, size, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, size, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, size, random.getRandomString(), data.POSITIVE_TEST],
        // invalid data size
        [data.STDLIB_VERSION_3, size, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, size, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, size, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function size
        [data.STDLIB_VERSION_3, invalidSize, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSize, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSize, random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, list, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, list, testFunction);
        checkCompileResult(contract, testType);
    });
});
