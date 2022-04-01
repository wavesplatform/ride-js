import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('contains functions',  () => {

    const contains = `contains(bar, foo)`;
    const invalidContains = `contains(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(contains, null, "Boolean");

    test.each([
        // contains
        [data.STDLIB_VERSION_4, contains, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, contains, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        // invalid data contains
        [data.STDLIB_VERSION_4, contains, random.getRandomAlias(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, contains, random.getRandomIssuesArray(), data.stringList, data.negativeTestType],
        // invalid function contains
        [data.STDLIB_VERSION_4, invalidContains, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidContains, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        // Can't find a function 'contains' for ride v3
        [data.STDLIB_VERSION_3, contains, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomSecondData, testType) => {
            const contract = precondition.generateContractForList(version, randomData, randomSecondData, testFunction);
            checkCompileResult(contract, testType);
    });
});
