import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('byteArray functions',  () => {

    const drop = `drop(callerTestData, 2)`;
    const invalidDrop = `drop(callerTestData)`;
    const dropRight = `dropRight(callerTestData, 2)`;
    const invalidDropRight = `dropRight(callerTestData)`;
    const size = `size(callerTestData)`;
    const invalidSize = `size()`;
    const take = `take(callerTestData, 2)`;
    const invalidTake = `take(callerTestData)`;
    const takeRight = `takeRight(callerTestData, 2)`;
    const invalidTakeRight = `takeRight(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(drop);

    test.each([
        // drop
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // dropRight
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // size
        [data.STDLIB_VERSION_3, size, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, size, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, size, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // take
        [data.STDLIB_VERSION_3, take, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, take, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, take, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // takeRight
        [data.STDLIB_VERSION_3, takeRight, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data drop
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid data dropRight
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid data size
        [data.STDLIB_VERSION_3, size, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, size, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, size, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid data take
        [data.STDLIB_VERSION_3, take, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, take, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, take, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid data takeRight
        [data.STDLIB_VERSION_3, takeRight, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        // invalid function drop
        [data.STDLIB_VERSION_3, invalidDrop, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function dropRight
        [data.STDLIB_VERSION_3, invalidDropRight, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function size
        [data.STDLIB_VERSION_3, invalidSize, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSize, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSize, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function take
        [data.STDLIB_VERSION_3, invalidTake, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTake, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTake, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function takeRight
        [data.STDLIB_VERSION_3, invalidTakeRight, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});