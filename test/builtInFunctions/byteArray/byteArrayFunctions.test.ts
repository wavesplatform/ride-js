import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('byteArray functions',  () => {

    const drop = `drop(callerTestData, ${random.getRandomInt()})`;
    const dropArgBeforeFunction = `callerTestData.drop(${random.getRandomInt()})`;
    const invalidDrop = `drop(callerTestData)`;
    const invalidDropArgBeforeFunc = `callerTestData.drop(callerTestData, ${random.getRandomInt()})`;

    const dropRight = `dropRight(callerTestData, ${random.getRandomInt()})`;
    const dropRightArgBeforeFunction = `callerTestData.dropRight(${random.getRandomInt()})`;
    const invalidDropRight = `dropRight(callerTestData)`;
    const invalidDropRightArgBeforeFunc = `callerTestData.dropRight(callerTestData, callerTestData)`;

    const size = `size(callerTestData)`;
    const sizeArgBeforeFunction = `callerTestData.size()`;
    const invalidSize = `size()`;
    const invalidSizeArgBeforeFunction = `callerTestData.size(callerTestData, callerTestData)`;

    const take = `take(callerTestData, ${random.getRandomInt()})`;
    const takeArgBeforeFunction = `callerTestData.take(${random.getRandomInt()})`;
    const invalidTake = `take(callerTestData)`;
    const invalidTakeArgBeforeFunction = `callerTestData.take(callerTestData)`;

    const takeRight = `takeRight(callerTestData, ${random.getRandomInt()})`;
    const takeRightArgBeforeFunction = `callerTestData.takeRight(${random.getRandomInt()})`;
    const invalidTakeRight = `takeRight(callerTestData)`;
    const invalidTakeRightArgBeforeFunc = `callerTestData.takeRight(callerTestData, callerTestData, callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(drop);

    test.each([
        // drop
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, drop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // dropRight
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // size
        [data.STDLIB_VERSION_3, size, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, size, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, size, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, size, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // take
        [data.STDLIB_VERSION_3, take, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, take, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, take, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, take, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // takeRight
        [data.STDLIB_VERSION_3, takeRight, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],

        // drop argument before function
        [data.STDLIB_VERSION_3, dropArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, dropArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // dropRight argument before function
        [data.STDLIB_VERSION_3, dropRightArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, dropRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, dropRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, dropRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // size argument before function
        [data.STDLIB_VERSION_3, sizeArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, sizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, sizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, sizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // take argument before function
        [data.STDLIB_VERSION_3, takeArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, takeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        // takeRight argument before function
        [data.STDLIB_VERSION_3, takeRightArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, takeRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.POSITIVE_TEST],

        // invalid data drop
        [data.STDLIB_VERSION_3, drop, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, drop, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, drop, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, drop, data.GreaterV3ResultBinaryEntry, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid data dropRight
        [data.STDLIB_VERSION_3, dropRight, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, dropRight, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid data size
        [data.STDLIB_VERSION_3, size, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, size, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, size, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, size, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid data take
        [data.STDLIB_VERSION_3, take, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, take, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, take, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, take, data.GreaterV3ResultBinaryEntry, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid data takeRight
        [data.STDLIB_VERSION_3, takeRight, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, takeRight, data.GreaterV3ResultBinaryEntry, random.getRandomUnion(), data.NEGATIVE_TEST],

        // invalid data drop argument before function
        [data.STDLIB_VERSION_3, dropArgBeforeFunction, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, dropArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid data dropRight argument before function
        [data.STDLIB_VERSION_3, dropRightArgBeforeFunction, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, dropRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, dropRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, dropRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid data size argument before function
        [data.STDLIB_VERSION_3, sizeArgBeforeFunction, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, sizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, sizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, sizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomInt(), data.NEGATIVE_TEST],
        // invalid data take argument before function
        [data.STDLIB_VERSION_3, takeArgBeforeFunction, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, takeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid data takeRight argument before function
        [data.STDLIB_VERSION_3, takeRightArgBeforeFunction, data.RideV3Result, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, takeRightArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomUnion(), data.NEGATIVE_TEST],

        // invalid function drop
        [data.STDLIB_VERSION_3, invalidDrop, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDrop, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function dropRight
        [data.STDLIB_VERSION_3, invalidDropRight, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDropRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function size
        [data.STDLIB_VERSION_3, invalidSize, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSize, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSize, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSize, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function take
        [data.STDLIB_VERSION_3, invalidTake, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTake, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTake, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTake, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function takeRight
        [data.STDLIB_VERSION_3, invalidTakeRight, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTakeRight, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // invalid function drop argument before function
        [data.STDLIB_VERSION_3, invalidDropArgBeforeFunc, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDropArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function dropRight argument before function
        [data.STDLIB_VERSION_3, invalidDropRightArgBeforeFunc, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidDropRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidDropRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidDropRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function size argument before function
        [data.STDLIB_VERSION_3, invalidSizeArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSizeArgBeforeFunction, data.GreaterV3ResultIntegerEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function take argument before function
        [data.STDLIB_VERSION_3, invalidTakeArgBeforeFunction, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTakeArgBeforeFunction, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // invalid function takeRight argument before function
        [data.STDLIB_VERSION_3, invalidTakeRightArgBeforeFunc, data.RideV3Result, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTakeRightArgBeforeFunc, data.GreaterV3ResultBinaryEntry, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, scriptResult, testString, testType) => {
        const contract = precondition.generateContractWithoutMatcher(version, scriptResult, testString, testFunction);
        checkCompileResult(contract, testType);
    });
});