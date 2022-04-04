import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('transferTransactionById',  () => {

    const transferTransactionById = `transferTransactionById(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(transferTransactionById);
    precondition.setData("TransferTransaction");

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.positiveTestType],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.positiveTestType],
        // invalid arg by transferTransactionById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.negativeTestType],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.negativeTestType],
        [data.STDLIB_VERSION_5, random.getRandomStringArray(), data.negativeTestType],
    ])('check ride v%i transferTransactionById function compile', (version, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });
})
