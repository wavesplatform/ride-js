import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('containsElement functions',  () => {

    const containsElement = `containsElement(bar, foo)`;
    const invalidContainsElement = `containsElement(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(containsElement);

    test.each([
        // containsElement
        [data.STDLIB_VERSION_4, containsElement, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, containsElement, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, containsElement, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, containsElement, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, containsElement, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, containsElement, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data containsElement
        [data.STDLIB_VERSION_4, containsElement, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, containsElement, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, containsElement, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        // invalid function containsElement
        [data.STDLIB_VERSION_4, invalidContainsElement, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidContainsElement, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidContainsElement, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'containsElement' for ride v3
        [data.STDLIB_VERSION_3, containsElement, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContract(version, randomData, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
