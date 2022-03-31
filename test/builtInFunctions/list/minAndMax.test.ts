import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('min and max function',  () => {

    const min = `min(callerTestData)`;
    const invalidMin = `min()`;
    const max = `max(callerTestData)`;
    const invalidMax = `max()`;

    const precondition = new GenerateContractForBuiltInFunctions(min, null, "Int");

    test.each([
        // min
        [data.STDLIB_VERSION_4, min, data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, min, data.intList, data.positiveTestType],
        // invalid data min
        [data.STDLIB_VERSION_3, min, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, min, data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_5, min, random.getRandomInt(), data.negativeTestType],
        // invalid function min
        [data.STDLIB_VERSION_3, invalidMin, data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidMin, data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidMin, data.intList, data.negativeTestType],
        // Can't find a function 'min' for ride v3
        [data.STDLIB_VERSION_3, min, data.intList, data.negativeTestType],

        // max
        [data.STDLIB_VERSION_4, max, data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, max, data.intList, data.positiveTestType],
        // invalid data max
        [data.STDLIB_VERSION_3, max, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, max, data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_5, max, random.getRandomInt(), data.negativeTestType],
        // invalid function max
        [data.STDLIB_VERSION_3, invalidMax, data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidMax, data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidMax, data.intList, data.negativeTestType],
        // Can't find a function 'max' for ride v3
        [data.STDLIB_VERSION_3, max, data.intList, data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, liat, testType) => {
            const contract = precondition.generateOnlyMatcherContract(version, liat, testFunction);
            checkCompileResult(contract, testType);
    });
});
