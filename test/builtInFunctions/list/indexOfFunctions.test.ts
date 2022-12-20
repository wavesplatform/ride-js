import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('indexOf and lastIndexOf functions',  () => {

    const indexOf = `indexOf(bar, foo)`;
    const invalidIndexOf = `indexOf(foo)`;
    const lastIndexOf = `lastIndexOf(bar, foo)`;
    const invalidLastIndexOf = `lastIndexOf(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(indexOf);

    test.each([
        // indexOf
        [data.STDLIB_VERSION_4, indexOf, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        // invalid data indexOf
        [data.STDLIB_VERSION_4, indexOf, random.getRandomAlias(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomIssuesArray(), data.stringList, data.negativeTestType],
        // invalid function indexOf
        [data.STDLIB_VERSION_4, invalidIndexOf, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidIndexOf, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
        // Can't find a function 'indexOf' for ride v3
        [data.STDLIB_VERSION_3, indexOf, random.getRandomStringArray(), data.stringList, data.negativeTestType],

        // lastIndexOf
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        // invalid data lastIndexOf
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomAlias(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomIssuesArray(), data.stringList, data.negativeTestType],
        // invalid function lastIndexOf
        [data.STDLIB_VERSION_4, invalidLastIndexOf, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidLastIndexOf, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
        // Can't find a function 'lastIndexOf' for ride v3
        [data.STDLIB_VERSION_3, lastIndexOf, random.getRandomStringArray(), data.stringList, data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, index, randomList, testType) => {
            const contract = precondition.generateContract(version, index, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
