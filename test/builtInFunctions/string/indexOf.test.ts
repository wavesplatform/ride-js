import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String indexOf and lastIndexOf functions',  () => {

    const indexOf = `indexOf(bar, foo)`;
    const invalidIndexOf = `indexOf(foo)`;
    const lastIndexOf = `lastIndexOf(bar, foo)`;
    const invalidLastIndexOf = `lastIndexOf(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(indexOf);

    test.each([
        // indexOf
        [data.STDLIB_VERSION_3, indexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, indexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        // invalid data indexOf
        [data.STDLIB_VERSION_4, indexOf, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
        // invalid function indexOf
        [data.STDLIB_VERSION_4, invalidIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],

        // lastIndexOf
        [data.STDLIB_VERSION_3, lastIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        // invalid data lastIndexOf
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
        // invalid function lastIndexOf
        [data.STDLIB_VERSION_4, invalidLastIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidLastIndexOf, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomIndexInt, randomString, testType) => {
            const contract = precondition.generateContract(version, randomIndexInt, randomString, testFunction);
            checkCompileResult(contract, testType);
    });
});
