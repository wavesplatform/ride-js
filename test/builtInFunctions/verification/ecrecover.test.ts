import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('ecrecover functions',  () => {

    const ecrecover = `ecrecover(callerTestData, callerTestData)`;
    const invalidecrecover = `ecrecover()`;

    const precondition = new GenerateContractForBuiltInFunctions(ecrecover);
    precondition.setData("ByteVector")

    test.each([
        // ecrecover
        [data.STDLIB_VERSION_4, ecrecover, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, ecrecover, random.getRandomByteVector(), data.positiveTestType],
        // invalid data ecrecover
        [data.STDLIB_VERSION_4, ecrecover, random.getRandomUnionArray(), data.negativeTestType],
        [data.STDLIB_VERSION_5, ecrecover, random.getRandomAddress(), data.negativeTestType],
        // invalid function ecrecover
        [data.STDLIB_VERSION_4, invalidecrecover, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, invalidecrecover, random.getRandomStringArray(), data.negativeTestType],
        // can't find a function 'ecrecover'
        [data.STDLIB_VERSION_3, ecrecover, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed',(version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
