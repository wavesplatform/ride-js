import * as data from "../../../testData/data";
import * as random from "../../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../../testResult";

describe('split_4C functions',  () => {

    const split_4C = `split_4C(bar, foo)`;
    const invalidSplit = `split_4C(foo)`;
    const split_4CArgBeforeFunctions = `bar.split_4C(foo)`;
    const invalidSplitArgBeforeFunctions = `foo.split_4C()`;

    const precondition = new GenerateContractForBuiltInFunctions(split_4C);

    test.each([
        // split_4C
        [data.STDLIB_VERSION_6, split_4C, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data split_4C
        [data.STDLIB_VERSION_6, split_4C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function split_4C
        [data.STDLIB_VERSION_6, invalidSplit, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // split_4C argument before function
        [data.STDLIB_VERSION_6, split_4CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data split_4C
        [data.STDLIB_VERSION_6, split_4CArgBeforeFunctions, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function split_4C
        [data.STDLIB_VERSION_6, invalidSplitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // Can't find a function 'split_4C'
        [data.STDLIB_VERSION_3, split_4C, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, split_4CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, split_4C, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, split_4CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, split_4C, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, split_4CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
