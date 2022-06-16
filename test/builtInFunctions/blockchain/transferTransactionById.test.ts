import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('transferTransactionById',  () => {

    const transferTransactionById = `transferTransactionById(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(transferTransactionById);
    precondition.setData("TransferTransaction");

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), data.POSITIVE_TEST],
        // invalid arg by transferTransactionById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i transferTransactionById function compile', (version, byteVector, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector);
        checkCompileResult(contract, testType);
    });
})
