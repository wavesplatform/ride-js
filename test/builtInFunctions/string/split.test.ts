import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('split functions',  () => {

    const split = `split(bar, foo)`;
    const invalidSplit = `split(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(split);

    test.each([
        // split
        [data.STDLIB_VERSION_3, split, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_4, split, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        [data.STDLIB_VERSION_5, split, random.getRandomStringArray(), random.getRandomStringArray(), data.positiveTestType],
        // invalid data split
        [data.STDLIB_VERSION_3, split, random.getRandomInt(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, split, random.getRandomInt(), data.stringList, data.negativeTestType],
        [data.STDLIB_VERSION_5, split, random.getRandomInt(), data.stringList, data.negativeTestType],
        // invalid function split
        [data.STDLIB_VERSION_3, invalidSplit, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidSplit, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidSplit, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContractForList(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
