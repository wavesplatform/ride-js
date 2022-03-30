import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('transactionHeightById',  () => {

    const transactionHeightByIdFunction = `transactionHeightById(callerTestData)`;

    const precondition =
        new GenerateContractForBuiltInFunctions
        (transactionHeightByIdFunction, null, 'Int');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.positiveTestType],
        // invalid arg by transactionHeightById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i transactionHeightById function compile', (version, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });
})