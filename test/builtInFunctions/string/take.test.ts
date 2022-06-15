import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('String take functions',  () => {

    const take = `take(foo, bar)`;
    const invalidTake = `take(foo)`;

    const precondition = new GenerateContractForBuiltInFunctions(take);

    test.each([
        // take
        [data.STDLIB_VERSION_3, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, take, random.getRandomString(), random.getRandomInt(), data.POSITIVE_TEST],
        // invalid data take
        [data.STDLIB_VERSION_3, take, random.getRandomString(), data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, take, random.getRandomString(), random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, take, random.getRandomString(), data.intList, data.NEGATIVE_TEST],
        // invalid function take
        [data.STDLIB_VERSION_3, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidTake, random.getRandomString(), random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, randomData, randomList, testType) => {
        const contract = precondition.generateContract(version, randomData, randomList, testFunction);
        checkCompileResult(contract, testType);
    });
});