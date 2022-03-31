import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('cons functions',  () => {


    const cons = `cons(randomData, list)`;
    const invalidCons = `cons(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(cons);

    test.each([
        // cons
        [data.STDLIB_VERSION_3, cons, random.getRandomInt(), random.getRandomList(), data.positiveTestType],
        [data.STDLIB_VERSION_4, cons, random.getRandomByteVector(), random.getRandomList(), data.positiveTestType],
        [data.STDLIB_VERSION_4, cons, random.getRandomAddress(), random.getRandomList(), data.positiveTestType],
        [data.STDLIB_VERSION_5, cons, random.getRandomIssuesArray(), random.getRandomList(), data.positiveTestType],
        [data.STDLIB_VERSION_5, cons, random.getRandomStringArray(), random.getRandomList(), data.positiveTestType],
        // invalid data cons
        [data.STDLIB_VERSION_3, cons, random.getRandomInt(), random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, cons, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, cons, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
        // invalid function cons
        [data.STDLIB_VERSION_3, invalidCons, random.getRandomInt(), random.getRandomIssuesArray(), data.negativeTestType],
        [data.STDLIB_VERSION_4, invalidCons, random.getRandomAlias(), random.getRandomStringArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidCons, random.getRandomIssuesArray(), random.getRandomAlias(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
            const contract = precondition.generateContractForList(version, testFunction, randomData, randomList);
            checkCompileResult(contract, testType);
    });
});
