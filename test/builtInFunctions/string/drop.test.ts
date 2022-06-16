import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('drop functions',  () => {

    const drop = `drop(callerTestData, 2)`;
    const invalidDrop = `drop(callerTestData)`;
    const precondition = new GenerateContractForBuiltInFunctions(drop);
    const dropRight = `dropRight(callerTestData, 2)`;
    const invalidDropRight = `dropRight(callerTestData)`;

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
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, scriptResult, testString, testType) => {
            const contract = precondition.generateContractWithoutMatcher(version, scriptResult, testString, testFunction);
            checkCompileResult(contract, testType);
    });
});