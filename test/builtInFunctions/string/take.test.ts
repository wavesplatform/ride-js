import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String take functions',  () => {

    const take = `take(foo, bar)`;
    const invalidTake = `take(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(take);

    test.each([
        // take
        [data.STDLIB_VERSION_3, take, random.getRandomStringArray(), random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_4, take, random.getRandomStringArray(), random.getRandomInt(), data.positiveTestType],
        [data.STDLIB_VERSION_5, take, random.getRandomStringArray(), random.getRandomInt(), data.positiveTestType],
        // invalid data take
        [data.STDLIB_VERSION_3, take, random.getRandomStringArray(), data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_4, take, random.getRandomStringArray(), random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_5, take, random.getRandomStringArray(), data.intList, data.negativeTestType],
        // invalid function take
        [data.STDLIB_VERSION_3, invalidTake, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidTake, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidTake, random.getRandomStringArray(), random.getRandomInt(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContractForList(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
