import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('contains functions',  () => {

    const contains = `contains(bar, foo)`;
    const invalidContains = `contains(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(contains);

    test.each([
        // contains
        [data.STDLIB_VERSION_4, contains, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, contains, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, contains, random.getRandomString(), random.getRandomString(), data.POSITIVE_TEST],
        // invalid data contains
        [data.STDLIB_VERSION_4, contains, random.getRandomAlias(), data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, contains, random.getRandomIssue(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, contains, random.getRandomInt(), data.stringList, data.NEGATIVE_TEST],
        // invalid function contains
        [data.STDLIB_VERSION_4, invalidContains, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidContains, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidContains, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
        // Can't find a function 'contains' for ride v3
        [data.STDLIB_VERSION_3, contains, random.getRandomString(), random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomSecondData, testType) => {
            const contract = precondition.generateContract(version, randomData, randomSecondData, testFunction);
            checkCompileResult(contract, testType);
    });
});
