import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('cons functions',  () => {

    const cons = `cons(foo, bar)`;
    const invalidCons = `cons(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(cons);

    test.each([
        // cons
        [data.STDLIB_VERSION_3, cons, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, cons, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, cons, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, cons, random.getRandomInt(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, cons, random.getRandomInt(), data.stringList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, cons, random.getRandomString(), data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, cons, random.getRandomString(), data.stringList, data.POSITIVE_TEST],
        // invalid data cons
        [data.STDLIB_VERSION_3, cons, random.getRandomInt(), random.getRandomIssue(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, cons, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, cons, random.getRandomInt(), random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, cons, random.getRandomInt(), random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function cons
        [data.STDLIB_VERSION_3, invalidCons, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidCons, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidCons, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidCons, random.getRandomIssue(), data.intList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContract(version, randomData, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
