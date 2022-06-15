import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('parseInt functions',  () => {

    const parseInt = `parseInt(callerTestData)`;
    const invalidParseInt = `parseInt()`;

    const parseIntValue = `parseIntValue(callerTestData)`;
    const invalidParseIntValue = `parseIntValue()`;

    const precondition = new GenerateContractForBuiltInFunctions(parseInt);
    precondition.setData("Int");

    test.each([
        [data.STDLIB_VERSION_3, parseInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, parseInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, parseIntValue, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntValue, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntValue, random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, parseInt, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseInt, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseInt, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, parseIntValue, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntValue, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntValue, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidParseInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, invalidParseInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, invalidParseIntValue, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, invalidParseIntValue, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseIntValue, random.getRandomInt(), data.POSITIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, int, testType) => {
        let intToStringForTest = `"${int}"`;
        const contract = precondition.generateOnlyMatcherContract(version, intToStringForTest);
        checkCompileResult(contract, testType);
    });
});
