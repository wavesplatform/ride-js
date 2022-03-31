import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('containsElement functions',  () => {

    const containsElement = `containsElement(list, randomData)`;
    const invalidContainsElement = `containsElement(randomData)`;

    const precondition = new GenerateContractForBuiltInFunctions(containsElement);

    test.each([
        // containsElement
        [data.STDLIB_VERSION_4, containsElement, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_4, containsElement, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        [data.STDLIB_VERSION_5, containsElement, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, containsElement, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        // invalid data containsElement
        [data.STDLIB_VERSION_4, containsElement, random.getRandomAlias(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, containsElement, random.getRandomIssuesArray(), data.stringList, data.negativeTestType],
        // invalid function containsElement
        [data.STDLIB_VERSION_4, invalidContainsElement, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidContainsElement, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
        // Can't find a function 'containsElement' for ride v3
        [data.STDLIB_VERSION_3, containsElement, random.getRandomStringArray(), data.stringList, data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContractForList(version, randomData, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
