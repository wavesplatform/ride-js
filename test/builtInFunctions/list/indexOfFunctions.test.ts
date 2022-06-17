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
        [data.STDLIB_VERSION_4, indexOf, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, indexOf, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        // invalid data indexOf
        [data.STDLIB_VERSION_4, indexOf, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, indexOf, random.getRandomAddress(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, indexOf, random.getRandomByteVector(), data.intList, data.NEGATIVE_TEST],
        // invalid function indexOf
        [data.STDLIB_VERSION_4, invalidIndexOf, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidIndexOf, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidIndexOf, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
        // Can't find a function 'indexOf' for ride v3
        [data.STDLIB_VERSION_3, indexOf, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],

        // lastIndexOf
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOf, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        // invalid data lastIndexOf
        [data.STDLIB_VERSION_4, lastIndexOf, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, lastIndexOf, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, lastIndexOf, random.getRandomDigestAlgorithmType(), data.intList, data.NEGATIVE_TEST],
        // invalid function lastIndexOf
        [data.STDLIB_VERSION_4, invalidLastIndexOf, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidLastIndexOf, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidLastIndexOf, random.getRandomIssue(), data.intList, data.NEGATIVE_TEST],
        // Can't find a function 'lastIndexOf' for ride v3
        [data.STDLIB_VERSION_3, lastIndexOf, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, index, randomList, testType) => {
            const contract = precondition.generateContract(version, index, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
