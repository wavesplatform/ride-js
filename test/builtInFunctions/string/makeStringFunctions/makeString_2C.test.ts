import * as data from "../../../testData/data";
import * as random from "../../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../../testResult";

describe('makeString_2C functions',  () => {
    const makeString_2C = `makeString_2C(bar, foo)`;
    const invalidMakeString_2C = `makeString_2C(foo)`;

    const makeString_2CArgBeforeFunc = `bar.makeString_2C(foo)`;
    const invalidMakeString_2CArgBeforeFunc = `foo.makeString_2C()`;

    const precondition = new GenerateContractForBuiltInFunctions(makeString_2C);

    test.each([
        // makeString_2C
        [data.STDLIB_VERSION_6, makeString_2C, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data makeString_2C
        [data.STDLIB_VERSION_4, makeString_2C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_2C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, makeString_2C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function makeString_2C
        [data.STDLIB_VERSION_4, invalidMakeString_2C, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMakeString_2C, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMakeString_2C, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'makeString_2C' for ride v3
        [data.STDLIB_VERSION_3, makeString_2C, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, makeString_2C, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_2C, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],

        // makeString_2C argument before function
        [data.STDLIB_VERSION_6, makeString_2CArgBeforeFunc, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data makeString_2C
        [data.STDLIB_VERSION_4, makeString_2CArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_2CArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, makeString_2CArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function makeString_2C
        [data.STDLIB_VERSION_4, invalidMakeString_2CArgBeforeFunc, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMakeString_2CArgBeforeFunc, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMakeString_2CArgBeforeFunc, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'makeString_2C' for ride v3
        [data.STDLIB_VERSION_3, makeString_2CArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, makeString_2CArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_2CArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
