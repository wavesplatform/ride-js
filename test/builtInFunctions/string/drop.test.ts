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
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultStringEntry, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultStringEntry, random.getRandomStringArray(), data.positiveTestType],
        // invalid data drop
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultStringEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // invalid function drop
        [data.STDLIB_VERSION_3, invalidDrop, data.RideV3Result, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],

        // dropRight string
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultStringEntry, random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultStringEntry, random.getRandomStringArray(), data.positiveTestType],
        // invalid data dropRight
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultStringEntry, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultStringEntry, random.getRandomIssuesArray(), data.negativeTestType],
        // invalid function dropRight
        [data.STDLIB_VERSION_3, invalidDropRight, data.RideV3Result, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, scriptResult, testString, testType) => {
            const contract = precondition.generateContractWithoutMatcher(version, scriptResult, testString, testFunction);
            checkCompileResult(contract, testType);
    });
});