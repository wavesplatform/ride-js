import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('toBigInt',  () => {

    const toBigIntFromByteVector = `toBigInt(callerTestData)`;
    const toBigIntFromByteVectorOnIndex = `toBigInt(callerTestData, 1, 6)`;
    const toBigIntFromInt = 'toBigInt(callerTestData)';
    const invalidToBigInt = 'toBigInt()';

    let precondition = new GenerateContractForBuiltInFunctions(toBigIntFromByteVector);
    precondition.setData("BigInt");

    test.each([
        [data.STDLIB_VERSION_5, toBigIntFromByteVector, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toBigIntFromByteVectorOnIndex, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, toBigIntFromInt, random.getRandomByteVector(), data.positiveTestType],
        // invalid data in toBigInt
        [data.STDLIB_VERSION_5, toBigIntFromByteVector, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, toBigIntFromByteVectorOnIndex, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_5, toBigIntFromInt, random.getRandomIssuesArray(), data.negativeTestType],
        // invalid function
        [data.STDLIB_VERSION_5, invalidToBigInt, random.getRandomByteVector(), data.negativeTestType],
        // Undefined type: `BigInt`
        [data.STDLIB_VERSION_3, toBigIntFromByteVector, random.getRandomByteVector(), data.negativeTestType],
        [data.STDLIB_VERSION_4, toBigIntFromByteVectorOnIndex, random.getRandomByteVector(), data.negativeTestType],
    ])('check ride v%i function %s compiles or failed', (version, testFunction, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, testFunction);
        checkCompileResult(contract, testType);
    });
});
