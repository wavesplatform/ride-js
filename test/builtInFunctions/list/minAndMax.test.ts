import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('min and max function',  () => {

    const min = `min(callerTestData)`;
    const minForBigInt = `min([callerTestData])`;
    const invalidMin = `min()`;

    const max = `max(callerTestData)`;
    const maxForBigInt = `max([callerTestData])`;
    const invalidMax = `max()`;

    const precondition = new GenerateContractForBuiltInFunctions(min);
    precondition.setData("Int");

    test.each([
        // min
        [data.STDLIB_VERSION_4, min, data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, min, data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, min, data.intList, data.POSITIVE_TEST],
        // invalid data min
        [data.STDLIB_VERSION_4, min, data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, min, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, min, random.getRandomString(), data.NEGATIVE_TEST],
        // invalid function min
        [data.STDLIB_VERSION_4, invalidMin, data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMin, data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMin, data.intList, data.NEGATIVE_TEST],
        // Can't find a function 'min' for ride v3
        [data.STDLIB_VERSION_3, min, data.intList, data.NEGATIVE_TEST],

        // max
        [data.STDLIB_VERSION_4, max, data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, max, data.intList, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, max, data.intList, data.POSITIVE_TEST],
        // invalid data max
        [data.STDLIB_VERSION_4, max, data.stringList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, max, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, max, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function max
        [data.STDLIB_VERSION_4, invalidMax, data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidMax, data.intList, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidMax, data.intList, data.NEGATIVE_TEST],
        // Can't find a function 'max' for ride v3
        [data.STDLIB_VERSION_3, max, data.intList, data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
        (version, testFunction, list, testType) => {
            const contract = precondition.generateOnlyMatcherContract(version, list, testFunction);
            checkCompileResult(contract, testType);
    });

    test.each([
        [data.STDLIB_VERSION_5, minForBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, maxForBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, minForBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, maxForBigInt, random.getRandomInt(), data.POSITIVE_TEST],
        // Compilation failed: Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, minForBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_3, maxForBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, minForBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, maxForBigInt, random.getRandomInt(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles with bigInt', (version, testFunction, testInt, testType) => {
        const bigInt = `toBigInt(${testInt})`;
        precondition.setData('BigInt')
        const contract = precondition.generateOnlyMatcherContract(version, bigInt, testFunction);
        checkCompileResult(contract, testType);
    });
});
