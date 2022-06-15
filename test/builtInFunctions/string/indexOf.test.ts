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
        [data.STDLIB_VERSION_3, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data indexOf
        [data.STDLIB_VERSION_4, indexOf, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function indexOf
        [data.STDLIB_VERSION_4, invalidIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // lastIndexOf
        [data.STDLIB_VERSION_3, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data lastIndexOf
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid function lastIndexOf
        [data.STDLIB_VERSION_4, invalidLastIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLastIndexOf, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomIndexInt, randomString, testType) => {
            const contract = precondition.generateContract(version, randomIndexInt, randomString, testFunction);
            checkCompileResult(contract, testType);
    });
});
