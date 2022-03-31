import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('getElement functions',  () => {

    const getElement = `getElement(list, randomData)`;
    const invalidGetElement = `getElement(randomData)`;

    const precondition = new GenerateContractForBuiltInFunctions(getElement);

    test.each([
        // getElement
        [data.STDLIB_VERSION_3, getElement, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_4, getElement, random.getRandomInt(), data.stringList, data.positiveTestType],
        [data.STDLIB_VERSION_5, getElement, random.getRandomInt(), data.intList, data.positiveTestType],
        // invalid data getElement
        [data.STDLIB_VERSION_3, getElement, random.getRandomStringArray(), data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_4, getElement, random.getRandomAlias(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_5, getElement, random.getRandomIssuesArray(), data.stringList, data.negativeTestType],
        // invalid function getElement
        [data.STDLIB_VERSION_3, invalidGetElement, random.getRandomInt(), data.intList, data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidGetElement, random.getRandomInt(), data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidGetElement, random.getRandomInt(), data.intList, data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContractForList(version, randomData, randomList, testFunction);
            console.log(randomData)
            checkCompileResult(contract, testType);
    });
});
