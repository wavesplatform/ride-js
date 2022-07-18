import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String take functions', () => {

    const take = `take(foo, bar)`;
    const takeRight = `takeRight(foo, bar)`;
    const invalidTake = `take(foo)`;
    const invalidTakeRight = `takeRight(foo)`;

    const takeArgBeforeFunc = `foo.take(bar)`;
    const takeRightArgBeforeFunc = `foo.takeRight(bar)`;
    const invalidTakeArgBeforeFunc = `foo.take()`;
    const invalidTakeRightArgBeforeFunc = `foo.takeRight(foo, bar)`;

    const precondition = new GenerateContractForBuiltInFunctions(take);

    test.each([
        // take
        [data.STDLIB_VERSION_3, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data take
        [data.STDLIB_VERSION_3, take, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, take, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, take, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, take, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        // invalid function take
        [data.STDLIB_VERSION_3, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],

        // takeRight
        [data.STDLIB_VERSION_3, takeRight, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeRight, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeRight, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, takeRight, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data takeRight
        [data.STDLIB_VERSION_3, takeRight, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeRight, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeRight, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, takeRight, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        // invalid function takeRight
        [data.STDLIB_VERSION_3, invalidTakeRight, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeRight, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeRight, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTakeRight, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContract(version, randomData, randomList, testFunction);
            checkCompileResult(contract, testType);
        });

    test.each([
        // take argument before function
        [data.STDLIB_VERSION_3, takeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, takeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data takeArgBeforeFunc
        [data.STDLIB_VERSION_3, takeArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeArgBeforeFunc, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeArgBeforeFunc, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, takeArgBeforeFunc, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        // invalid function takeArgBeforeFunc
        [data.STDLIB_VERSION_3, invalidTakeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTakeArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],

        // takeRight argument before function
        [data.STDLIB_VERSION_3, takeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, takeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, takeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, takeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data takeRightArgBeforeFunc
        [data.STDLIB_VERSION_3, takeRightArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, takeRightArgBeforeFunc, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, takeRightArgBeforeFunc, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, takeRightArgBeforeFunc, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        // invalid function takeRightArgBeforeFunc
        [data.STDLIB_VERSION_3, invalidTakeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTakeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTakeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidTakeRightArgBeforeFunc, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContract(version, randomData, randomList, testFunction);
            checkCompileResult(contract, testType);
        });
});
