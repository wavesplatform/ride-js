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
        [data.STDLIB_VERSION_4, removeByIndex, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, removeByIndex, random.getRandomInt(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, removeByIndex, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        // invalid data removeByIndex
        [data.STDLIB_VERSION_4, removeByIndex, random.getRandomAlias(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, removeByIndex, random.getRandomIssue(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, removeByIndex, random.getRandomByteVector(), data.stringList, data.NEGATIVE_TEST],
        // invalid function removeByIndex
        [data.STDLIB_VERSION_4, invalidRemoveByIndex, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidRemoveByIndex, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidRemoveByIndex, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'removeByIndex' for ride v3
        [data.STDLIB_VERSION_3, removeByIndex, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, index, randomList, testType) => {
            const contract = precondition.generateContract(version, index, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
