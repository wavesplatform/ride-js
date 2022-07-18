import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('ecrecover functions',  () => {

    const ecrecover = `ecrecover(callerTestData, callerTestData)`;
    const ecrecoverArgBeforeFunc = `callerTestData.ecrecover(callerTestData)`;
    const invalidecrecover = `ecrecover()`;
    const invalidecrecoverArgBeforeFunc = `callerTestData.ecrecover(callerTestData, callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(ecrecover);
    precondition.setData("ByteVector")

    test.each([
        // ecrecover
        [data.STDLIB_VERSION_4, ecrecover, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, ecrecover, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, ecrecover, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data ecrecover
        [data.STDLIB_VERSION_4, ecrecover, random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, ecrecover, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, ecrecover, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function ecrecover
        [data.STDLIB_VERSION_4, invalidecrecover, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidecrecover, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidecrecover, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // can't find a function 'ecrecover'
        [data.STDLIB_VERSION_3, ecrecover, random.getRandomByteVector(), data.NEGATIVE_TEST],

        // ecrecover argument before function
        [data.STDLIB_VERSION_4, ecrecoverArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, ecrecoverArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, ecrecoverArgBeforeFunc, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid data ecrecover
        [data.STDLIB_VERSION_4, ecrecoverArgBeforeFunc, random.getRandomUnion(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, ecrecoverArgBeforeFunc, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, ecrecoverArgBeforeFunc, random.getRandomDigestAlgorithmType(), data.NEGATIVE_TEST],
        // invalid function ecrecover
        [data.STDLIB_VERSION_4, invalidecrecoverArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidecrecoverArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidecrecoverArgBeforeFunc, random.getRandomByteVector(), data.NEGATIVE_TEST],
        // can't find a function 'ecrecover'
        [data.STDLIB_VERSION_3, ecrecover, random.getRandomByteVector(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
