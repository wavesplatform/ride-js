import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('size function',  () => {

    const size = `size(callerTestData)`;
    const invalidSize = `size()`;

    const precondition = new GenerateContractForBuiltInFunctions(size);
    precondition.setData("Int");

    test.each([
        // size
        [data.STDLIB_VERSION_3, size, data.stringList, data.positiveTestType],
        [data.STDLIB_VERSION_4, size, data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, size, data.stringList, data.positiveTestType],
        // invalid data size
        [data.STDLIB_VERSION_3, size, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, size, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, size, random.getRandomInt(), data.negativeTestType],
        // invalid function size
        [data.STDLIB_VERSION_3, invalidSize, data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidSize, data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSize, data.intList, data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, list, testType) => {
            const contract = precondition.generateOnlyMatcherContract(version, list, testFunction);
            checkCompileResult(contract, testType);
    });
});
