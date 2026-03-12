import * as data from "../../../testData/data";
import * as random from "../../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../../testResult";

describe('split_51C functions',  () => {

    const split_51C = `split_51C(bar, foo)`;
    const invalidSplit = `split_51C(foo)`;
    const split_51CArgBeforeFunctions = `bar.split_51C(foo)`;
    const invalidSplitArgBeforeFunctions = `foo.split_51C()`;

    const precondition = new GenerateContractForBuiltInFunctions(split_51C);

    test.each([
        // split_51C
        [data.STDLIB_VERSION_6, split_51C, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data split_51C
        [data.STDLIB_VERSION_6, split_51C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function split_51C
        [data.STDLIB_VERSION_6, invalidSplit, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // split_51C argument before function
        [data.STDLIB_VERSION_6, split_51CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data split_51C
        [data.STDLIB_VERSION_6, split_51CArgBeforeFunctions, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function split_51C
        [data.STDLIB_VERSION_6, invalidSplitArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],

        // Can't find a function 'split_51C'
        [data.STDLIB_VERSION_3, split_51C, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, split_51CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, split_51C, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, split_51CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, split_51C, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, split_51CArgBeforeFunctions, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
