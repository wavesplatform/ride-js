import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String size function',  () => {

    const size = `size(callerTestData)`;
    const invalidSize = `size()`;

    const precondition = new GenerateContractForBuiltInFunctions(size, null, "Int");

    test.each([
        // size
        [data.STDLIB_VERSION_3, size, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, size, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, size, random.getRandomStringArray(), data.positiveTestType],
        // invalid data size
        [data.STDLIB_VERSION_3, size, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, size, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, size, random.getRandomInt(), data.negativeTestType],
        // invalid function size
        [data.STDLIB_VERSION_3, invalidSize, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidSize, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSize, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, list, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, list, testFunction);
        checkCompileResult(contract, testType);
    });
});
