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
        [data.STDLIB_VERSION_3, cons, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        [data.STDLIB_VERSION_4, cons, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_4, cons, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        [data.STDLIB_VERSION_5, cons, random.getRandomInt(), data.intList, data.positiveTestType],
        [data.STDLIB_VERSION_5, cons, random.getRandomStringArray(), data.stringList, data.positiveTestType],
        // invalid data cons
        [data.STDLIB_VERSION_3, cons, random.getRandomInt(), random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, cons, random.getRandomStringArray(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, cons, random.getRandomInt(), random.getRandomAlias(), data.negativeTestType],
        // invalid function cons
        [data.STDLIB_VERSION_3, invalidCons, random.getRandomInt(), random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidCons, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidCons, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContract(version, randomData, randomList, testFunction);
            checkCompileResult(contract, testType);
    });
});
