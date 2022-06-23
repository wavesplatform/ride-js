import * as data from "../../../testData/data";
import * as random from "../../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../../testResult";

describe('split functions',  () => {

    const split = `split(bar, foo)`;
    const invalidSplit = `split(foo)`;
    const splitArgBeforeFunctions = `bar.split(foo)`;
    const invalidSplitArgBeforeFunctions = `foo.split()`;

    const precondition = new GenerateContractForBuiltInFunctions(split);

    test.each([
        // split
        [data.STDLIB_VERSION_3, split, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, split, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, split, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, split, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data split
        [data.STDLIB_VERSION_3, split, random.getRandomInt(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, split, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, split, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, split, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function split
        [data.STDLIB_VERSION_3, invalidSplit, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSplit, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSplit, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSplit, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // split
        [data.STDLIB_VERSION_3, splitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, splitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, splitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, splitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data split
        [data.STDLIB_VERSION_3, splitArgBeforeFunctions, random.getRandomInt(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, splitArgBeforeFunctions, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, splitArgBeforeFunctions, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, splitArgBeforeFunctions, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function split
        [data.STDLIB_VERSION_3, invalidSplitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidSplitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidSplitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidSplitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
