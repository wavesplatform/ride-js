import * as data from "../../../testData/data";
import * as random from "../../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../../testResult";

describe('makeString_11C functions',  () => {
    const makeString_11C = `makeString_11C(bar, foo)`;
    const invalidMakeString_11C = `makeString_11C(foo)`;

    const makeString_11CArgBeforeFunc = `bar.makeString_11C(foo)`;
    const invalidMakeString_11CArgBeforeFunc = `foo.makeString_11C()`;

    const precondition = new GenerateContractForBuiltInFunctions(makeString_11C);

    test.each([
        // makeString_11C
        [data.STDLIB_VERSION_6, makeString_11C, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data makeString_11C
        [data.STDLIB_VERSION_4, makeString_11C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_11C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, makeString_11C, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function makeString_11C
        [data.STDLIB_VERSION_4, invalidMakeString_11C, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMakeString_11C, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMakeString_11C, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'makeString_11C' for ride v3
        [data.STDLIB_VERSION_3, makeString_11C, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, makeString_11C, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_11C, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],

        // makeString_11C argument before function
        [data.STDLIB_VERSION_6, makeString_11CArgBeforeFunc, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data makeString_11C
        [data.STDLIB_VERSION_4, makeString_11CArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_11CArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, makeString_11CArgBeforeFunc, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function makeString_11C
        [data.STDLIB_VERSION_4, invalidMakeString_11CArgBeforeFunc, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMakeString_11CArgBeforeFunc, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMakeString_11CArgBeforeFunc, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'makeString_11C' for ride v3
        [data.STDLIB_VERSION_3, makeString_11CArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, makeString_11CArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString_11CArgBeforeFunc, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
