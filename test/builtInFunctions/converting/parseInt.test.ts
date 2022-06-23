import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('parseInt functions',  () => {

    const parseInt = `parseInt(callerTestData)`;
    const invalidParseInt = `parseInt()`;
    const parseIntArgBeforeFunc = `callerTestData.parseInt()`;
    const invalidParseIntArgBeforeFunc = `callerTestData.parseInt(callerTestData, callerTestData)`;

    const parseIntValue = `parseIntValue(callerTestData)`;
    const invalidParseIntValue = `parseIntValue(callerTestData,callerTestData,callerTestData,callerTestData)`;
    const parseIntValueArgBeforeFunc = `callerTestData.parseIntValue()`;
    const invalidParseIntValueArgBeforeFunc = `callerTestData.parseIntValue(callerTestData,callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(parseInt);
    precondition.setData("Int");

    test.each([
        [data.STDLIB_VERSION_3, parseInt, data.RideV3Result, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomUnion(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomDigestAlgorithmType(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, parseIntValue, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomUnion(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, parseInt, data.GreaterV3ResultIntegerEntry,  random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, parseIntValue, data.GreaterV3ResultIntegerEntry, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidParseInt, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidParseInt, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseInt, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidParseInt, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, invalidParseIntValue, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidParseIntValue, data.GreaterV3ResultIntegerEntry,  random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseIntValue, data.GreaterV3ResultIntegerEntry,  random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidParseIntValue, data.GreaterV3ResultIntegerEntry,  random.getRandomInt(), data.NEGATIVE_TEST],

        //argument before function
        [data.STDLIB_VERSION_3, parseIntArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomUnion(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomDigestAlgorithmType(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_3, parseIntValueArgBeforeFunc, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomUnion(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAddress(), data.POSITIVE_TEST],
        // invalid data
        [data.STDLIB_VERSION_3, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, parseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, parseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function
        [data.STDLIB_VERSION_3, invalidParseIntArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidParseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidParseIntArgBeforeFunc, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, invalidParseIntValueArgBeforeFunc, data.RideV3Result, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidParseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidParseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidParseIntValueArgBeforeFunc, data.GreaterV3ResultIntegerEntry,  random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, int, testType) => {
        let intToStringForTest = `"${int}"`;
        const contract = precondition
            .generateContractFromMatchingAndCase(version, scriptResult, intToStringForTest, testFunction);

        checkCompileResult(contract, testType);
    });
});
