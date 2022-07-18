import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('getElement functions',  () => {

    const getElement = `getElement(bar, foo)`;
    const invalidGetElement = `getElement(foo)`;
    const getElementArgBeforeFunc = `bar.getElement(foo)`;
    const invalidGetElementArgBeforeFunc = `bar.getElement(bar, foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(getElement);

    test.each([
        // getElement
        [data.STDLIB_VERSION_3, getElement, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getElement, random.getRandomInt(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getElement, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getElement, random.getRandomInt(), data.stringList, data.POSITIVE_TEST],
        // invalid data getElement
        [data.STDLIB_VERSION_3, getElement, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getElement, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getElement, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getElement, random.getRandomByteVector(), data.intList, data.NEGATIVE_TEST],
        // invalid function getElement
        [data.STDLIB_VERSION_3, invalidGetElement, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetElement, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetElement, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetElement, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],

        // getElement argument before function
        [data.STDLIB_VERSION_3, getElementArgBeforeFunc, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, getElementArgBeforeFunc, random.getRandomInt(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, getElementArgBeforeFunc, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, getElementArgBeforeFunc, random.getRandomInt(), data.stringList, data.POSITIVE_TEST],
        // invalid data getElement argument before function
        [data.STDLIB_VERSION_3, getElementArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, getElementArgBeforeFunc, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, getElementArgBeforeFunc, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, getElementArgBeforeFunc, random.getRandomByteVector(), data.intList, data.NEGATIVE_TEST],
        // invalid function getElement argument before function
        [data.STDLIB_VERSION_3, invalidGetElementArgBeforeFunc, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidGetElementArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidGetElementArgBeforeFunc, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidGetElementArgBeforeFunc, random.getRandomInt(), data.intList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, index, randomList, testType) => {
            const contract = precondition.generateContract(version, index, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
