import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('parseInt functions',  () => {

    const parseInt = `parseInt(callerTestData)`;
    const invalidParseInt = `parseInt()`;

    const parseIntValue = `parseIntValue(callerTestData)`;
    const invalidParseIntValue = `parseIntValue()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (parseInt, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, parseInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, parseInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, parseInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_3, parseIntValue, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, parseIntValue, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, parseIntValue, random.getRandomInt(), data.positiveTestType],
        // invalid data
        [data.STDLIB_VERSION_3, parseInt, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, parseInt, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, parseInt, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_3, parseIntValue, random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, parseIntValue, random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, parseIntValue, random.getRandomStringArray(), data.negativeTestType],
        // invalid function
        [data.STDLIB_VERSION_3, invalidParseInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, invalidParseInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, invalidParseInt, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_3, invalidParseIntValue, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, invalidParseIntValue, random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, invalidParseIntValue, random.getRandomInt(), data.positiveTestType],
    ])('check ride v%i function %s compiles', (version, testFunction, int, testType) => {
        let intToStringForTest = `"${int}"`;
        const contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        checkCompileResult(contract, testType);
    });
});
