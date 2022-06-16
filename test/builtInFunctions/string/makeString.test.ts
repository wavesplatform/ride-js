import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('makeString functions',  () => {

    const makeString = `makeString(bar, foo)`;
    const invalidMakeString = `makeString(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(makeString);

    test.each([
        // makeString
        [data.STDLIB_VERSION_4, makeString, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, makeString, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, makeString, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data makeString
        [data.STDLIB_VERSION_4, makeString, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, makeString, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, makeString, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function makeString
        [data.STDLIB_VERSION_4, invalidMakeString, random.getRandomAlias(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMakeString, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMakeString, random.getRandomIssue(), random.getRandomAlias(), data.NEGATIVE_TEST],
        // Can't find a function 'makeString' for ride v3
        [data.STDLIB_VERSION_3, makeString, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});
