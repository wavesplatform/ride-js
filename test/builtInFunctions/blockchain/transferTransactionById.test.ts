import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('transferTransactionById',  () => {

    const transferTransactionById = `transferTransactionById(callerTestData)`;
    const invalidFunctionTransferById = `transferTransactionById(callerTestData, callerTestData)`;
    const transferTransactionByIdArgBeforeFunc = `callerTestData.transferTransactionById()`;
    const invalidTransferArgBeforeFunc = `callerTestData.transferTransactionById(callerTestData)`;

    const precondition = new GenerateContractForBuiltInFunctions(transferTransactionById);
    precondition.setData("TransferTransaction");

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), transferTransactionById, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), transferTransactionById, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), transferTransactionById, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), transferTransactionById, data.POSITIVE_TEST],
        // invalid arg by transferTransactionById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), transferTransactionById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), transferTransactionById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomString(), transferTransactionById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomString(), transferTransactionById, data.NEGATIVE_TEST],
        // invalid function by transferTransactionById
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), invalidFunctionTransferById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), invalidFunctionTransferById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), invalidFunctionTransferById, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), invalidFunctionTransferById, data.NEGATIVE_TEST],

        // transferTransactionById argument before function
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), transferTransactionByIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), transferTransactionByIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), transferTransactionByIdArgBeforeFunc, data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), transferTransactionByIdArgBeforeFunc, data.POSITIVE_TEST],
        // invalid arg by transferTransactionById
        [data.STDLIB_VERSION_3, random.getRandomAddress(), transferTransactionByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomAlias(), transferTransactionByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomString(), transferTransactionByIdArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomString(), transferTransactionByIdArgBeforeFunc, data.NEGATIVE_TEST],
        // invalid function by transferTransactionById
        [data.STDLIB_VERSION_3, random.getRandomByteVector(), invalidTransferArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, random.getRandomByteVector(), invalidTransferArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, random.getRandomByteVector(), invalidTransferArgBeforeFunc, data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, random.getRandomByteVector(), invalidTransferArgBeforeFunc, data.NEGATIVE_TEST],
    ])('check ride v%i transferTransactionById function compile', (version, byteVector, func, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, byteVector, func);
        checkCompileResult(contract, testType);
    });
})
