import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('drop functions', () => {

    const drop = `drop(callerTestData, ${random.getRandomInt()})`;
    const invalidDrop = `drop(callerTestData)`;
    const dropArgBeforeFunc = `callerTestData.drop(${random.getRandomInt()})`;
    const invalidDropArgBeforeFunc = `callerTestData.drop(callerTestData, callerTestData)`;

    const dropRight = `dropRight(callerTestData, ${random.getRandomInt()})`;
    const invalidDropRight = `dropRight(callerTestData)`;
    const dropRightArgBeforeFunc = `callerTestData.dropRight(${random.getRandomInt()})`;
    const invalidDropRightArgBeforeFunc = `callerTestData.dropRight(callerTestData, callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(drop);

    test.each([
        // drop string
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, drop, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        // invalid data drop
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, drop, data.GreaterV3ResultStringEntry, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function drop
        [data.STDLIB_VERSION_3, invalidDrop, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // dropRight string
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, dropRight, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        // invalid data dropRight
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, dropRight, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function dropRight
        [data.STDLIB_VERSION_3, invalidDropRight, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });

    test.each([
        // drop string arg before functions
        [data.STDLIB_VERSION_3, dropArgBeforeFunc, data.RideV3Result, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, dropArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        // invalid data drop
        [data.STDLIB_VERSION_3, dropArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, dropArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function drop
        [data.STDLIB_VERSION_3, invalidDropArgBeforeFunc, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDropArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // dropRight string arg before functions
        [data.STDLIB_VERSION_3, dropRightArgBeforeFunc, data.RideV3Result, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropRightArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropRightArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, dropRightArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomString(), data.POSITIVE_TEST],
        // invalid data dropRight
        [data.STDLIB_VERSION_3, dropRightArgBeforeFunc, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropRightArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropRightArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, dropRightArgBeforeFunc, data.GreaterV3ResultStringEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function dropRight
        [data.STDLIB_VERSION_3, invalidDropRightArgBeforeFunc, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDropRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function (arg before func) %s compiles or failed', (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});