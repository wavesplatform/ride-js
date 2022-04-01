import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('removeByIndex function',  () => {

    const removeByIndex = `removeByIndex(bar, foo)`;
    const invalidRemoveByIndex = `removeByIndex(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(removeByIndex);

    test.each([
        // removeByIndex
        [data.STDLIB_VERSION_4, removeByIndex, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, removeByIndex, random.getRandomInt(), data.stringList, data.positiveTestType],
        // invalid data removeByIndex
        [data.STDLIB_VERSION_4, removeByIndex, random.getRandomAlias(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, removeByIndex, random.getRandomIssuesArray(), data.stringList, data.negativeTestType],
        // invalid function removeByIndex
        [data.STDLIB_VERSION_4, invalidRemoveByIndex, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidRemoveByIndex, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
        // Can't find a function 'removeByIndex' for ride v3
        [data.STDLIB_VERSION_3, removeByIndex, random.getRandomStringArray(), data.stringList, data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, index, randomList, testType) => {
            const contract = precondition.generateContractForList(version, index, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
